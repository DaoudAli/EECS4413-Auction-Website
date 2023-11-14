export default function Payment() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 md:p-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Payment Page
        </h2>
        <form className="flex flex-wrap -mx-3"
          onSubmit={e => {
            console.log()
            e.preventDefault();
            fetch("http://localhost:3500/payment/pay", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "http://localhost:3000",
              },
              body: JSON.stringify({
                cardNumber: e.currentTarget.cardNumber.value,
                nameOnCard: e.currentTarget.nameOnCard.value,
                expirationDate: e.currentTarget.expirationDate.value,
                securityCode: e.currentTarget.securityCode.value,
              }),
            })
          }}>
          <div className="w-full md:w-1/2 px-3 mb-6">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="cardNumber">Card Number *</label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              required id="cardNumber" type="text" placeholder="" maxLength={16} pattern="[0-9]{16}"
              onInvalid={e => e.target.setCustomValidity("Please enter a valid Card Number")}
              onChange={e => e.target.setCustomValidity("")} />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="nameOnCard">Name on Card *</label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              required id="nameOnCard" type="text" placeholder="" />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="expirationDate">{"Expiration Date (MM/YY) *"}</label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="expirationDate" type="text" pattern="(?:0[1-9]|1[0-2])/[0-9]{2}" maxLength={5}
              required title="Enter a date in this format MM/YY"
              onInvalid={e => e.target.setCustomValidity("Please enter a valid Expiration Date")}
              onChange={e => e.target.setCustomValidity("")} />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="securityCode">{"Security Code (CCV) *"}</label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              required id="securityCode" type="text" placeholder="" pattern="[0-9]{3}" maxLength={3}
              onInvalid={e => e.target.setCustomValidity("Please enter a valid Security Code")}
              onChange={e => e.target.setCustomValidity("")} />
          </div>
          <div className="w-full px-3 mt-6">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}