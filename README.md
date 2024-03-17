## Meal Planner

利用 Expo 及 Firebase 製作一個規劃三餐的App，作品原型來自 Youtube -- Sujan Anand，除了原本的規劃三餐功能外，還提供了內建食譜查看及一週食材統計功能。

## 專案功能

- 可以新增指定日期的三餐規劃
- 可以複製指定日期的三餐規劃到下一個日期
- 可以刪除指定日期的規劃
- 可以查看食譜
- 可以查看一週食材統計，方便採買。


## 頁面呈現

### 1. 一週規畫區

![img](https://upload.cc/i1/2024/03/17/gUal2n.png)

### 2.點擊進入日期，可以看到內建食譜

![img](https://upload.cc/i1/2024/03/17/vIp8my.gif)

### 3. 新增食譜到指定餐期

![img](https://upload.cc/i1/2024/03/17/yHQdFx.gif)


### 4. 點擊食譜後可看到詳細內容

![img](https://upload.cc/i1/2024/03/09/yQXZw0.png) 


### 5. 添加餐期後，可以看到一週食譜的統計需求

![img](https://upload.cc/i1/2024/03/17/43NG5l.png)


### 6. 可以複製和刪除餐期
![img](https://upload.cc/i1/2024/03/17/MzJRic.gif)
![img](https://upload.cc/i1/2024/03/17/yAu4tb.gif)



## 如何使用

1. 安裝 Node.js 及 npm
2. clone 專案到本地

3. 在本地開啟後，透過終端機進入資料夾，輸入：

```bash
npm install
```

4. 安裝完畢，繼續輸入:

```bash
npx expo start --tunnel
```

5. 若成功運行，則會看到底下訊息，接著可以使用手機下載Expo Go，掃描連結進入

```bash

Starting Metro Bundler
Tunnel connected.
Tunnel ready.
```

6. 要停止時則按 ：

```bash
ctrl + c
```

