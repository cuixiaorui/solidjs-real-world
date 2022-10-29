# Solidjs-Real-World
学习使用 solidjs 
通过重写 solidjs 官方的 read world 项目来驱动学习 solidjs
整个过程全部通过直播展示
直播过程采用结对编程的方式来探索、探讨以及思考
玩中学  享受编程 享受思考的过程 这应该才是学习的最佳状态
而这次的直播结对编程学习 solidjs 就是一次尝试
只要参与进来 一定会受益匪浅的

## 结对编程规则
可以分为主动结对和被动结对两种方式
想主动结对编程的同学可以提前预约报名
如果当天没有主动结对编程的同学 那么就会实施随机在群里选择一名同学
这名同学有三个选择：
1. 晚上和阿崔结对编程
2. 有事参加不了 群里发个10元红包
3. 退群
为什么有退群这个选项呢 主要是为了整个群的气氛  
不积极的咱就淘汰掉  留下的都是积极的同学 
这样会让这件事变的更好玩  群里面的气氛也会变的非常的好

## 开源形式
采用开源的形式来做这次的直播活动
如果你有更好的意见或者建议 可以踊跃的提出以及 pr 
其核心目的是"一起学习  一起成长"
项目地址：https://github.com/cuixiaorui/solidjs-real-world
以后直播的进度都会同步到该项目的 README 下  方便各位同学跟上进度

## 预习资料

同学们可以提前看一些预习资料  这样结对的时候不至于完全蒙蔽
当然 solidjs 和 react 非常的类似 而且在结对的时候我也会 hold 全场
所以也不用担心

- https://www.solidjs.com/
- https://www.solidjs.com/tutorial/introduction_basics
- https://github.com/cuixiaorui/solidjs-real-world
- https://github.com/solidjs/solid-realworld

## 准备工作
- 腾讯会议 https://meeting.tencent.com/
- Live Share https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare

## 参与进来
直接加阿崔 wx: cuixr1314  说明你的来意即可

## 最后
同学们玩的愉快~

## 结对日期表
- [x] 10.25 日  Baboon King
- 10.26 日  abyss


## Tasking
- [x] 完成 article 列表的展示
- [x] 完成 home 页面的 tags 切换功能
	- [x] tag 加载数据之前显示 loading
	- [x] 点击 tag 之后 会发起一个 ajax 请求
	- [x] 把 tag 获取到的新的数据给到 article
	- [x] 重构 把 store 拆分成 多个  类似于 pinia 的 store 的使用方式 
- [x] bug：点击 tab 跳转到 registry 页面
- [x] 分页功能
	- [x] 展示所有的数据(数据可以分页)
	- [x] 展示分页的页码UI 
	- [x] 点击页码之后重新请求数据
        	- [x] 请求 page 应该改变
- [x] 尝试给 store 写测试
	- [x] 集成 vitest 
		- 执行 pnpm test 可以跑通一个测试
	- [x] 跑通 article 第一个功能（可以初始化就可以）
		- [x] localStorage 是没有的 -> 需要 jsdom
	- [x] 写一个真实的单元测试 -> 获取文章列表
		- [x] 如何 mock 一个 api
- [ ] 把 article store 所有的功能 全部测试掉