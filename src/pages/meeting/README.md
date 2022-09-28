# 会议室使用预览

显示各会议室（共10个）在指定天内的预约情况


![](/docs/screenshot/meeting-room.png)

# 功能

## 会议室管理
> 🔒`ADMIN`

字段名|中文名|类型|非空|默认值|说明
-|-|-|-|-|-
id|编号（主键）|String|是||房间编号，不可重复
name|名称|String|是||房间名称
location|位置|String|否||位置信息
tag|标签|String|否||属性标签（以英文逗号隔开），如：视频,投影仪
scale|规模|int|是|10|会议室人数规模
special|特殊|boolean|是|false|是否为特殊房间，需要管理员审核才能预约成功
summary|说明|String|否||详细说明信息

## 预约

## 预约总览
