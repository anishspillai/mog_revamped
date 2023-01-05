export class ShoppingCartItem {
	id: string;
	brandName: string;
	imagePath: string;
	actualPrice: number;
	quantity: number;
	type: string;
	subType: string;
	weight: number;
	unitOfWeight: string;

	constructor(init?: Partial<ShoppingCartItem>) {
		Object.assign(this, init);
	}

	get totalPrice() {
		return this.actualPrice * this.quantity;
	}
}
