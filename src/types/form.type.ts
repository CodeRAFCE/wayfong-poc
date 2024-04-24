export interface PreferredProductsType {
	preferredProducts: string;
	orderFrequency: string;
	quantity: number | string;
}

export type FormProp = {
	id?: string | null;
	// restaurant: boolean;
	// supermarket: boolean;
	// others: boolean;
	preferredTime: string[];
	// checkboxes: boolean[];
	business: string;
	anyOtherText?: string;
	companyName: string;
	contactPerson: string;
	phone: string;
	zipCode: string;
	city: string;
	state: string;
	address1: string;
	address2: string;
	landmark: string;
	email: string;
	country: string;
	products: PreferredProductsType[];

	general: boolean;
	meat: boolean;
	seafood: boolean;
	cookedFood: boolean;
	dimSum: boolean;
	tofu: boolean;
	roastedMeat: boolean;
	grocery: boolean;
};
