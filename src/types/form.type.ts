export type PreferredProducts = {
	productName: string;
	orderFrequency: string;
	quantity: number | string;
};

export type ShippingAddress = {
	addressLine1: string;
	addressLine2: string;
	city: string;
	state: string;
	country: string;
	zipCode: string;
};

// export type FormProp = {
// 	id?: string | null;
// 	preferredTime: string[];
// 	checkDefaultAddress: boolean;
// 	payTerm: string;
// 	payType: string;
// 	interestedProducts: string[];
// 	business: string;
// 	anyOtherText?: string;
// 	companyName: string;
// 	contactPerson: string;
// 	phone: string;
// 	shipping;
// 	email: string;
// 	country: string;
// 	products: PreferredProductsType[];
// };

export interface CustomerOnboardingFormData {
	id?: string | null;
	companyName: string;
	contactName: string;
	phone: number | string;
	businessType: string | string[];
	email: string;
	products: PreferredProducts[];
	addressLine1: string;
	addressLine2: string;
	city: string;
	state: string;
	country: string;
	zipCode: string;
	preferredTimeSlots: string[];
	interestedProductCategories: string[];
	comment: string;
	turnOverPerAnnum: number | string;
	payTerm: string;
	payType: string;
	isAlsoBillingAddress: boolean;
	deliveryOption: string;
}
