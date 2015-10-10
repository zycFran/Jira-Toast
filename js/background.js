//var rules={
//  "newRule1":{"coinName":"btc", "platform":"btcchina", "onPrice":"100", "belowPrice":"50"},
//  "newRule2":{"coinName":"ltc", "platform":"okcoin", "onPrice":"20", "belowPrice":"10"}
//}
//新版本消息推送
if ( (!localStorage["versionNotice"] || localStorage["versionNotice"] != BASINFO.VERSION) && BASINFO.VERSIONINFO != ""){
	var notification = webkitNotifications.createNotification(
	                'icon.png',  
	                "比特币行情", 
	                BASINFO.VERSIONINFO
	);
	notification.show(); 
	localStorage["versionNotice"] = BASINFO.VERSION;
}

//默认显示设置
if (!localStorage["btcDisp"]){
	localStorage["btcDisp"] = true;
	localStorage["ltcDisp"] = true;
	localStorage["altDisp"] = true;
	localStorage["altDispArr"] = JSON.stringify(["xpm","zcc","mec", "ppc", "src", "tag", "pts", "wdc", "dgc", "dog"])
}
if (!localStorage["badgeCoin"]) {
	localStorage["badgeCoin"] = "btc";
	localStorage["badgePlat"] = "okcoin";
}
if (!localStorage["upColor"]) {
	localStorage["upColor"] = "red";
	localStorage["downColor"] = "green";
}

//首次检查价格提醒
if (localStorage["priceNotification"]){
	//console.log("rules:"+localStorage["priceNotification"]);
	var rules=JSON.parse(localStorage["priceNotification"]);
	for (key in rules) {
	  getPrice(rules[key]);
	}
}

//首次显示角标价格
var badgeRule = {"coinName":localStorage["badgeCoin"], "platform":localStorage["badgePlat"], "onPrice":"1000000", "belowPrice":"0"};
getPrice(badgeRule);

//循环检查价格提醒和更新角标价格
setInterval(function () {
	if (localStorage["priceNotification"]){
		rules=JSON.parse(localStorage["priceNotification"]);
		for (key in rules) {
		  getPrice(rules[key]);
		}
	}
	badgeRule = {"coinName":localStorage["badgeCoin"], "platform":localStorage["badgePlat"], "onPrice":"1000000", "belowPrice":"0"};
	getPrice(badgeRule);
}, 3000);

function getPrice(rule){
	switch(rule.platform){
		case "bitstamp":
			if (rule.coinName=="btc") {
				getBtcPrice("https://www.bitstamp.net/api/ticker/",rule.platform,rule);	
			} 
			break;
		case "796":
			if (rule.coinName=="btc") {
				getBtcPrice("http://api.796.com/v3/futures/ticker.html?type=weekly",rule.platform,rule);	
			} 
			break;
		case "btcchina":
			if (rule.coinName=="btc")
		    	getBtcPrice("https://data.btcchina.com/data/ticker?market=btccny",rule.platform,rule);
	    	else if(rule.coinName=="ltc"){
				getLtcPrice("https://data.btcchina.com/data/ticker?market=ltccny",rule.platform,rule);
			}
			break;
		case "okcoin":
			if (rule.coinName=="btc") {
				getBtcPrice("https://www.okcoin.com/api/ticker.do",rule.platform,rule);
			} else if(rule.coinName=="ltc"){
				getLtcPrice("https://www.okcoin.com/api/ticker.do?symbol=ltc_cny",rule.platform,rule);
			}
			break;
		case "huobi":
			if (rule.coinName=="btc") {
				getHBPrice(rule);	
			} else if(rule.coinName=="ltc"){
				getHBLtcPrice(rule);
			}
			break;
		case "btctrade":
			if (rule.coinName=="btc") {
				getBtcPrice("http://www.btctrade.com/api/ticker",rule.platform,rule);	
			} 
			break;
		case "btc38":
			getBtc38AltPrice(rule.coinName,rule);
			break;
		case "bter":
			getBterAltPrice(rule.coinName,rule);
			break;
	}
}







