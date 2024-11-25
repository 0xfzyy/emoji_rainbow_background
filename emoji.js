// 表情包配置
const emojiConfig = {
    // 表情库 - 可以根据需要添加更多表情
    emojis: {
        
        basic: ['😊', '😃', '😄', '😆', '😅', '😂', '🤣', // 开心系列
            '😌', '😏', '😉', '🙂', '😎', // 放松/得意系列
            '🥰', '😍', '🤩', '☺️', '😗', // 喜爱系列
            '🤔', '🤨', '😐', '😑', '😶', // 思考/中性系列
            '😥', '😮', '😯', '😦', '😧', // 惊讶/担心系列
            '😴', '🥱', '😪', // 疲惫系列
            '😭', '😢', '😩', '😫', '😖', // 难过系列
            '😡', '😠', '🤬', '😤', // 生气系列
            ],
    },
    // 动画配置
    animation: {
        minDuration: 1, // 最小动画持续时间
        maxDuration: 3, // 最大动画持续时间
        minDelay: 0,    // 最小延迟时间
        maxDelay: 3,    // 最大延迟时间
        lifetime: 10000 // 表情存在时间
    },
    // 表情外观配置
    appearance: {
        minSize: 100,    // 最小字体大小
        maxSize: 150,    // 最大字体大小
        minOpacity: 0.3,// 最小透明度
        maxOpacity: 0.8 // 最大透明度
    },
    // 数量配置
    count: {
        initial: 10,    // 初始表情数量
        maximum: 20     // 最大同时存在数量
    }
};

class EmojiManager {
    constructor(config) {
        this.config = config;
        this.activeEmojis = new Set();
        this.isRunning = false;
        this.currentTheme = 'basic';
    }

    // 获取随机数
    random(min, max) {
        return Math.random() * (max - min) + min;
    }

    // 获取随机表情
    getRandomEmoji() {
        const emojiArray = this.config.emojis[this.currentTheme];
        return emojiArray[Math.floor(Math.random() * emojiArray.length)];
    }

    // 创建单个表情元素
    
    createEmojiElement() {
        const emoji = document.createElement('div');
        emoji.className = 'emoji';
        emoji.textContent = this.getRandomEmoji();

        // 随机大小
        const size = this.random(
            this.config.appearance.minSize,
            this.config.appearance.maxSize
        );
        emoji.style.fontSize = `${size}px`;

        // 随机位置
        emoji.style.left = `${this.random(0, 100)}vw`;
        emoji.style.top = `${this.random(0, 100)}vh`;

        // 随机透明度
        emoji.style.opacity = this.random(
            this.config.appearance.minOpacity,
            this.config.appearance.maxOpacity
        );

        // 随机动画延迟和持续时间
        const delay = this.random(
            this.config.animation.minDelay,
            this.config.animation.maxDelay
        );
        const duration = this.random(
            this.config.animation.minDuration,
            this.config.animation.maxDuration
        );

        emoji.style.animationDelay = `${delay}s`;
        emoji.style.animationDuration = `${duration}s`;

        return emoji;
    }

    // 添加新表情
    addEmoji() {
        if (this.activeEmojis.size >= this.config.count.maximum) {
            return;
        }

        const emoji = this.createEmojiElement();
        document.body.appendChild(emoji);
        this.activeEmojis.add(emoji);

        // 设置生命周期
        setTimeout(() => {
            if (emoji.parentNode) {
                emoji.parentNode.removeChild(emoji);
                this.activeEmojis.delete(emoji);
                if (this.isRunning) {
                    this.addEmoji();
                }
            }
        }, this.config.animation.lifetime);
    }

    // 改变主题
    changeTheme(theme) {
        if (this.config.emojis[theme]) {
            this.currentTheme = theme;
        }
    }

    // 开始动画
    start() {
        this.isRunning = true;
        // 初始化表情
        for (let i = 0; i < this.config.count.initial; i++) {
            this.addEmoji();
        }
    }

    // 停止添加新表情
    stop() {
        this.isRunning = false;
    }

    // 清除所有表情
    clear() {
        this.activeEmojis.forEach(emoji => {
            if (emoji.parentNode) {
                emoji.parentNode.removeChild(emoji);
            }
        });
        this.activeEmojis.clear();
    }

    // 添加鼠标跟随效果
    enableMouseFollow() {
        document.addEventListener('mousemove', (e) => {
            if (!this.isRunning) return;
            
            const chance = Math.random();
            if (chance < 0.1 && this.activeEmojis.size < this.config.count.maximum) {
                const emoji = this.createEmojiElement();
                emoji.style.left = `${e.clientX}px`;
                emoji.style.top = `${e.clientY}px`;
                document.body.appendChild(emoji);
                this.activeEmojis.add(emoji);

                setTimeout(() => {
                    if (emoji.parentNode) {
                        emoji.parentNode.removeChild(emoji);
                        this.activeEmojis.delete(emoji);
                    }
                }, this.config.animation.lifetime);
            }
        });
    }
}

// 使用示例
document.addEventListener('DOMContentLoaded', () => {
    // 创建表情管理器
    const emojiManager = new EmojiManager(emojiConfig);
    
    // 启动表情动画
    emojiManager.start();
    
    // 启用鼠标跟随效果
    emojiManager.enableMouseFollow();

    // 添加主题切换功能（可选）
    window.changeEmojiTheme = (theme) => {
        emojiManager.changeTheme(theme);
    };

    // 添加控制按钮（可选）
    const controls = {
        stop: () => emojiManager.stop(),
        start: () => emojiManager.start(),
        clear: () => emojiManager.clear(),
        changeTheme: (theme) => emojiManager.changeTheme(theme)
    };

    // 将控制器暴露给全局（方便调试）
    window.emojiControls = controls;
});