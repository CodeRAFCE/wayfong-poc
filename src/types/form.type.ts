export type FormProp = {
	id?: string | null;
	restaurant: boolean;
	supermarket: boolean;
	others: boolean;
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
	products: {
		preferredProducts: string;
		orderFrequency: string;
		quantity: number | string;
	}[];

	general: boolean;
	meat: boolean;
	seafood: boolean;
	cookedFood: boolean;
	dimSum: boolean;
	tofu: boolean;
	roastedMeat: boolean;
	grocery: boolean;

	morning1: boolean;
	morning2: boolean;
	afternoon1: boolean;
	afternoon2: boolean;
	evening1: boolean;
	evening2: boolean;
};
