# Shoopy: Enhancing Your Shopping Experience

## Introduction:
Shoopy is not just another online shopping platform; it's a dynamic web application designed to revolutionize your shopping experience. The recent feature additions aim to provide users with a seamless and personalized journey, introducing profile pictures, region-based discounts, and real-time currency exchange rate calculations.

## Feature Description:
In this latest update, three key features have been introduced to make Shoopy stand out:

1. **User Profile Pictures:**
   - Elevate your online presence by displaying your profile picture on the site. Simply log in using the Affinidi login button to personalize your Shoopy experience.
   - The implementation of profile pictures can be explored in the `types` folder, specifically within the `UserInfo` type.

2. **Region-based Discounts:**
   - Shoopy dynamically calculates and applies region-specific discounts, leveraging user country information obtained from Affinidi and the [REST Countries API](https://restcountries.com/).
   - Dive into the discount calculation logic within the `src/utils/discountCalculator.js` file.

3. **Exchange-Rate Calculation:**
   - Experience transparent and real-time pricing with Shoopy's integration of the [Exchange Rate API](https://www.exchangerate-api.com/). View product prices in your preferred currency, ensuring accuracy and up-to-date information.

## Dependencies and Technologies Used:
To bring these features to life, Shoopy embraced the following dependencies:
- [REST Countries API](https://restcountries.com/): Fetching user country details, including currency and region.
- [Exchange Rate API](https://www.exchangerate-api.com/): Providing dynamic currency exchange rate updates.

## Challenges Faced:
Implementing these features came with its set of challenges, particularly in handling asynchronous user data. These challenges were skillfully navigated by implementing promises and leveraging the React `useEffect` hook, ensuring a seamless flow of data retrieval and processing.

## Testing:
A rigorous testing process was conducted to validate the functionality of profile picture handling, discount calculations, and currency exchange rate updates. Test scenarios covered various user locations, guaranteeing precise discount assignment and accurate currency conversion.

## Deployment:
Shoopy is now live, hosted on [Vercel](https://vercel.com/) with the Next.js framework. Careful adjustments were made to redirect URIs, guaranteeing smooth interaction with the backend.

## Conclusion:
The latest Shoopy features transcend the typical online shopping experience. With personalized profile pictures, region-specific discounts, and real-time currency exchange rates, Shoopy offers a robust and adaptable codebase, setting the stage for continuous enhancements and improvements. Shop smarter, shop with Shoopy.
