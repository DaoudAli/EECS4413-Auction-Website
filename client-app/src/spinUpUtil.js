export default async () => {
  let spinUpAuction = await fetch(
    "https://auction-service.onrender.com/auctions/health"
  );
  let spinUpCatalogue = await fetch(
    "https://eecs4413-catalogue-service.onrender.com/catalogue/items"
  );
  let spinUpPayment = await fetch(
    "https://payment-service-nx9h.onrender.com/payment/all"
  );
  let spinUpUser = await fetch("https://user-service-of2m.onrender.com/users");
};
