import { CustomerOnboardingFormData } from "../../types/form.type";
import { TimeZones } from "../enums/time-zones";

export const TIME_OPTIONS = [
	"9 AM - 11 AM",
	"11 AM - 1 PM",
	"1 PM - 3 PM",
	"3 PM - 5 PM",
	"5 PM - 7 PM",
	"7 PM - 9 PM",
];

export const DELIVERY_OPTIONS = [
	"Self Pickup",
	"Deliver to Location",
	"Deliver to Trucking Company",
];
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

export const BUSINESS_TYPE = [
	"Restaurant",
	"Supermarket",
	"Walk-in",
	"Staff",
	"Charity",
	"Wholesale",
	"Jobber",
];

export const DEFAULT_VALUES: CustomerOnboardingFormData = {
	companyName: "",
	contactName: "",
	phone: "",
	zipCode: "",
	city: "",
	state: "",
	addressLine1: "",
	addressLine2: "",
	country: "USA",
	email: "",
	payTerm: "",
	payType: "",
	products: [{ productName: "", orderFrequency: "", quantity: "" }],
	isAlsoBillingAddress: false,
	preferredTimeSlots: [],
	preferredTimeZone: TimeZones.CST,
	businessType: [],
	interestedProductCategories: [],
	turnOverPerAnnum: "",
	comment: "",
	deliveryOption: "",
};
