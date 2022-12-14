/*
 * @Author: coderzhaolu && izhaicy@163.com
 * @Date: 2022-06-22 11:13:07
 * @LastEditors: coderzhaolu && izhaicy@163.com
 * @LastEditTime: 2022-08-07 08:54:15
 * @FilePath: /pinkmoe_server/model/response/dashboard.go
 * @Description: https://github.com/Coder-ZhaoLu/pinkmoe   (如需用于商业用途或者二开，请联系作者捐助任意金额即可)
 * QQ:2419857357;支付宝:13135986153
 * Copyright (c) 2022 by coderzhaolu, All Rights Reserved.
 */
package response

type OrderLarge struct {
	Amount    int `json:"amount"`
	Decline   int `json:"decline"`
	Rise      int `json:"rise"`
	WeekLarge int `json:"weekLarge"`
}

type Saleroom struct {
	Amount       int     `json:"amount"`
	Degree       float64 `json:"degree"`
	WeekSaleroom int     `json:"weekSaleroom"`
}

type Visits struct {
	Amount    int     `json:"amount"`
	DayVisits int     `json:"dayVisits"`
	Decline   float64 `json:"decline"`
	Rise      float64 `json:"rise"`
}

type Ua struct {
	Amount   int     `json:"amount"`
	Decline  float64 `json:"decline"`
	Rise     float64 `json:"rise"`
	DayLarge int     `json:"dayLarge"`
}

type FluxTrend struct {
	Today     []int `json:"today"`
	Yesterday []int `json:"yesterday"`
}

type Console struct {
	OrderLarge `json:"orderLarge"`
	Saleroom   `json:"saleroom"`
	Visits     `json:"visits"`
	Ua         `json:"ua"`
	FluxTrend  `json:"fluxTrend"`
}
