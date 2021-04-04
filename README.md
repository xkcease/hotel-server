# 酒店预订系统-Node.js服务端
Node.js + Express

该仓库为酒店预订系统的Node.js服务端，其前台微信小程序和Vue后台如下：
> [微信小程序前台](https://github.com/xkcease/hotel-weapp)  

> [Vue后台](https://github.com/xkcease/hotel-management)

## 技术栈
- Node.js
- Express
- Mysql
- ES6

## 安装与使用
```shell
# 安装依赖
npm install

# 运行
node app.js
		
```

## API
1.  管理员登录 
2.  修改密码
3.  获取管理员信息
4.  添加新管理员
5.  修改权限
6.  删除管理员
7.  获取房间信息
8.  添加新房间
9.  修改房间
10. 上传图片
11. 删除房间
12. 获取订单信息
13. 修改订单
14. 删除订单
15. 办理入住
16. 办理退房
17. 获取价格
18. 修改价格
19. 获取用户
20. 用户登录
21. 获取用户手机号
22. 获取酒店详情
23. 获取房间详情
24. 修改酒店详情
25. 修改房间详情
26. 预订
27. 获取用户订单


## 目录
```shell
hotel-server
│  .gitignore
│  app.js
│  LICENSE
│  package-lock.json
│  package.json
│  README.md
│
├─api                              // sql操作模块 
│      admin.js
│      guest.js
│      intro.js
│      order.js
│      price.js
│      room.js
│      user.js
│
├─db                              // 数据库操作封装
│      config.js
│      index.js
│      structure.js               // 表结构
│
├─domain                          // 实体
│      Admin.js
│      Guest.js
│      HotelIntro.js
│      Order.js
│      Price.js
│      Room.js
│      RoomIntro.js
│
├─module
│      cache.js	                  // 缓存模块
│      encrypt.js                 // 加密模块
│      jwt.js	                  // jwt封装
│      permissionInterceptor.js	  // 权限拦截器
│      tokenInterceptor.js        // token拦截器
│      utils.js
│      validator.js               // 表单校验工具
│      WXBizDataCrypt.js          // 小程序解密模块
│
├─routes
│  ├─admin
│  │      adminInfo.js
│  │      deleteAdmin.js
│  │      getAdmins.js
│  │      login.js
│  │      register.js
│  │      updatePassword.js
│  │      updatePermission.js
│  │
│  ├─guest
│  │      getGuests.js
│  │
│  ├─intro
│  │      getAllRoomIntros.js
│  │      getHotelIntro.js
│  │      getRoomIntro.js
│  │      updateHotelIntro.js
│  │      updateRoomIntro.js
│  │      uploadIntroImg.js
│  │
│  ├─order
│  │      checkIn.js
│  │      checkOut.js
│  │      deleteOrder.js
│  │      getOrderInfo.js
│  │      getOrders.js
│  │      getUserOrder.js
│  │	  getUserOrders.js
│  │      reserve.js
│  │      updateOrder.js
│  │
│  ├─price
│  │      getPrice.js
│  │      updatePrice.js
│  │
│  ├─room
│  │      addRoom.js
│  │      deleteRoom.js
│  │      getRoomInfo.js
│  │ 	  getRoomOptions.js
│  │      getRooms.js
│  │      updateRoom.js
│  │      uploadImg.js
│  │
│  └─user
│          getPhone.js
│          getUser.js
│          loginUser.js
│
└─static                          
    └─img
```
