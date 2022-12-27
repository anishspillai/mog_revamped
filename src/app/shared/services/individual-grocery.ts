export class IndividualGrocery {

    actualPrice?: number;
    brandName = ''
    id?: string
    imagePath?: string
    offerPrice?: number
    type?: string
    subType?: string
    unitOfWeight?: string
    weight?: number

    maxShoppingIsRestricted?= false
    maxShoppingCount?: number

    bulkPurchaseOfferAvailable?= false
    bulkPurchaseOfferCount?: number
    bulkPurchaseOfferPrice?: number

    objectID?: string

    catagory?: string

    description?: string
    stock = 0
    $key: string;
}
