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
> 任意用户均可操作

字段名|类型|非空|默认值|说明
-|-|-|-|-|-
title|String|是||会议主题
roomId|String|是||会议室编号
uid|String|是||预约人ID
uname|String|是||预约人名称
begin|String|是||开始时间，格式为 HH:mm
end|String|是||结束时间，格式为 HH:mm
cell|int|是|1|持续时段（按半小时一个时段计算），系统自动计算
status|int|是|0|状态，0=待确认，1=已确认，2=已取消
summary|String|否||备注信息

## 预约总览
