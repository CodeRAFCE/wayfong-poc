import {FormProp} from "../../types/form.type";

export const TIME_OPTIONS = [
	"9 AM - 11 AM",
	"11 AM - 1 PM",
	"1 PM - 3 PM",
	"3 PM - 5 PM",
	"5 PM - 7 PM",
	"7 PM - 9 PM",
];
export const TYPE_OPTIONS = ["Restaurant", "Supermarket", "Others"];
export const PAY_TERM = ["Weekly", "Bi-Monthly", "Monthly", "Quarterly"];
export const PAY_TYPE = ["Cash", "Card", "Cheque", "ACH"];
export const PRODUCT_CATEGORY = [
	"General",
	"Meat",
	"Seafood",
	"Cooked Food",
	"Dim Sum",
	"Tofu",
	"Roasted Meat",
	"Grocery",
];

export const DEFAULT_VALUES: FormProp = {
	companyName: "",
	contactPerson: "",
	phone: "",
	zipCode: "",
	city: "",
	state: "",
	country: "USA",
	email: "",
	address1: "",
	address2: "",
	landmark: "",
	payTerm: "",
	payType: "",
	products: [{preferredProducts: "", orderFrequency: "", quantity: ""}],
	checkDefaultAddress: false,
	preferredTime: [],
	business: "",
	anyOtherText: "",
	interestedProducts: [],
};
