const calBtn = document.getElementById("cal"); // Button Calculator
const resetBtn = document.getElementById("reset"); // Button Calculator

calBtn.addEventListener("click",() => {
	const numPayment = 3.21/100;
	const numCom = 7.49/100;

	let disPrice = document.getElementById("price") // แสดงราคา
	let disFee = document.getElementById("fee") // แสดงค่าชำระเงิน
	let disCom = document.getElementById("com") // แสดงค่าธรรมเนียม
	let disResult = document.getElementById("result") // แสดงยอดเงินที่ได้รับ
	let disprofit = document.getElementById("profit") // แสดงกำไร
	let empText = document.getElementById("emp-text") // 

	let cost = Number(document.getElementById("cost").value) // ต้นทุน
	let price = Number(document.getElementById("price").value) // ราคาสินค้า
	let sellerVoucher = Number(document.getElementById("slVoucher").value) // ส่วนลดร้านค้า
	let spVoucher = Number(document.getElementById("spVoucher").value) // ส่วนลดแพลตฟอร์ม
	let shipFeeBuyer = Number(document.getElementById("buyerFee").value) // ค่าส่งจากผู้ซื้อ
	let shipFeeShopee = Number(document.getElementById("shipFee").value) // ค่าส่งที่ชำระจริง
	
	let priceTotal = price - sellerVoucher;
	let buyerTotal = priceTotal - spVoucher + shipFeeBuyer;
	let paymentTransCost = Math.round((buyerTotal + spVoucher) * numPayment);
	let comFee = Math.round(priceTotal * numCom);
	let discount = shipFeeShopee - shipFeeBuyer;
	let result = priceTotal - paymentTransCost - comFee - discount ;
	let profit = result - cost - discount - 12 ;

	
	if(cost == " " && price == " " && sellerVoucher == " " && spVoucher == " " && shipFeeBuyer == " " && shipFeeShopee == " "){
		empText.classList.add('alert')
		empText.classList.add('show')
		empText.classList.add('open')
		empText.classList.add('open')
	}else{
		disPrice.innerHTML = `ราคาสินค้าที่จ่ายรวมส่วนลด = ${priceTotal}`;
		disFee.innerHTML = `ค่าธุรกรรมการชำระเงิน 3.21% = ${paymentTransCost}`;
		disCom.innerHTML = `ค่ธรรมเนียมการขาย 7.48% = ${comFee}`;
		disResult.innerHTML = `รวมยอดเงินที่ผู้ขายได้รับ = ${result}`;
		disprofit.innerHTML = `กำไร(หักค่าส่ง) = ${profit}`;
	}

	// if(profit == -12 && result == 0 && comFee == 0 && paymentTransCost == 0 && priceTotal == 0){
	// 	disprofit.innerHTML = `กำไร(หักค่าส่ง) = 0`
	// }else{
	// 	disprofit.innerHTML = `กำไร(หักค่าส่ง) = ${profit}`
	// }

})

resetBtn.addEventListener("click", ()=> {
	let disPrice = document.getElementById("price"); // แสดงราคา
	let disFee = document.getElementById("fee"); // แสดงค่าชำระเงิน
	let disCom = document.getElementById("com"); // แสดงค่าธรรมเนียม
	let disResult = document.getElementById("result"); // แสดงยอดเงินที่ได้รับ
	let disprofit = document.getElementById("profit"); // แสดงกำไร
	let empText = document.getElementById("emp-text"); // 

	disPrice.innerHTML = "";
	disFee.innerHTML = "";
	disCom.innerHTML = "";
	disResult.innerHTML = "";
	disprofit.innerHTML = ""
	empText.innerHTML = "";

})

fetch("shipWeight.json")
.then((res) => {
	return res.json();
})
.then((shipWeight) => {
	let placeholder = document.getElementById("data-output");
	let out = "";
	shipWeight.forEach(element => {
		out += `
			<tr>
				<td>${element.weight}</td>
				<td>${element.bmr}</td>
				<td>${element.provincial}</td>
			</tr>
		`
	});
	placeholder.innerHTML = out;
})
.catch((error) => {
	console.log(error.message);
})