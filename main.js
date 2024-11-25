function startLevel(level) {
    alert(`开始第 ${level} 关`);
    // 这里添加进入关卡的逻辑
}

// 添加一些交互效果
document.querySelectorAll('.level-card:not(.locked)').forEach(card => {
    card.addEventListener('mouseover', () => {
        const emojis = ['✨', '🌟', '💫', '⭐'];
        const emoji = document.createElement('div');
        emoji.className = 'emoji';
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = `${Math.random() * 100}%`;
        emoji.style.top = `${Math.random() * 100}%`;
        card.appendChild(emoji);
        
        setTimeout(() => emoji.remove(), 1000);
    });

    
});




// 关卡配置
const levelConfig = {
    1: {
        name: "愤怒的红色",
        url: "levels/level2.html",
        color: "#ff0000",
        bgColor: "#ffeded"  // 添加背景色
    },
    2: {
        name: "悲伤的蓝色",
        url: "levels/level3.html",
        color: "#6C9FFF",
        bgColor: "#f0f5ff"
    },
    3: {
        name: "恐惧的灰色",
        url: "levels/level4.html",
        color: "#b6bfd2",
        bgColor: "#f5f7fa"
    },
    4: {
        name: "平静的绿色",
        url: "levels/level5.html",
        color: "#89cf86",
        bgColor: "#f0fff0"
    },
    5: {
        name: "爱的粉色",
        url: "levels/level6.html",
        color: "#ce3a9a",
        bgColor: "#fff0f7"
    },
};


// 在关卡跳转时使用对应的颜色
async function startLevel(level) {
    if (document.querySelector(`.level-card:nth-child(${level})`).classList.contains('locked')) {
        showLockMessage(level);
        return;
    }

    const levelData = levelConfig[level];
    const transition = createTransitionElement();
    
    // 播放开始音效
    playLevelStartSound();

    // 显示关卡信息
    showLevelInfo(level, levelData);

    // 执行转场动画
    transition.style.backgroundColor = levelData.color;
    transition.classList.add('active');

    // 等待动画完成后跳转，并传递颜色参数
    setTimeout(() => {
        const url = new URL(levelData.url, window.location.href);
        url.searchParams.set('color', levelData.color);
        url.searchParams.set('bgColor', levelData.bgColor);
        url.searchParams.set('levelName', levelData.name);
        window.location.href = url.toString();
    }, 1000);
}

// 更新关卡信息显示
function showLevelInfo(level, colors) {
    const info = document.createElement('div');
    info.className = 'level-info';
    info.innerHTML = `
        <div class="info-content" style="background: linear-gradient(45deg, ${colors.primary}88, ${colors.secondary}88)">
            <h2>Level ${level}</h2>
            <h3>${colors.name}</h3>
            <div class="loading-bar"></div>
        </div>
    `;
    document.body.appendChild(info);
}
// 创建过渡动画元素
function createTransitionElement() {
    const transition = document.createElement('div');
    transition.className = 'level-transition';
    document.body.appendChild(transition);
    return transition;
}

// 关卡跳转函数
async function startLevel(level) {
    if (document.querySelector(`.level-card:nth-child(${level})`).classList.contains('locked')) {
        showLockMessage(level);
        return;
    }

    const levelData = levelConfig[level];
    const transition = createTransitionElement();
    
    // 播放开始音效
    playLevelStartSound();

    // 显示关卡信息
    showLevelInfo(level, levelData);

    // 执行转场动画
    transition.style.backgroundColor = levelData.color;
    transition.classList.add('active');

    // 等待动画完成后跳转
    setTimeout(() => {
        window.location.href = levelData.url;
    }, 1000);
}

// 显示关卡锁定消息
function showLockMessage(level) {
    const message = document.createElement('div');
    message.className = 'lock-message';
    message.innerHTML = `
        <div class="message-content">
            <h2>🔒 关卡未解锁</h2>
            <p>请先完成前面的关卡</p>
            <button onclick="this.parentElement.parentElement.remove()">确定</button>
        </div>
    `;
    document.body.appendChild(message);
}

// 播放音效
function playLevelStartSound() {
    const audio = new Audio('assets/level-start.mp3');
    audio.volume = 0.5;
    audio.play().catch(() => {}); // 忽略可能的自动播放限制错误
}

// 显示关卡信息
function showLevelInfo(level, levelData) {
    const info = document.createElement('div');
    info.className = 'level-info';
    info.innerHTML = `
        <div class="info-content">
            <h2>Level ${level}</h2>
            <h3>${levelData.name}</h3>
            <div class="loading-bar"></div>
        </div>
    `;
    document.body.appendChild(info);
}

// 添加关卡预览效果
document.querySelectorAll('.level-card:not(.locked)').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) scale(1.05)';
        card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.boxShadow = '';
    });
});