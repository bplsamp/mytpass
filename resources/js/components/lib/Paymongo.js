export class Pay {
    static async createLink(amount, desc) {
        try {
            const options = {
                method: "POST",
                headers: {
                    accept: "application/json",
                    "content-type": "application/json",
                    authorization:
                        "Basic c2tfdGVzdF9vYkRIVHByUDJrTldRY3VkQlpudWJIWHU6cGtfdGVzdF9ScGpUQTdhc05KTFZ3aUt5RzhxVG9YYWQ=",
                },
                body: JSON.stringify({
                    data: { attributes: { amount: amount, description: desc } },
                }),
            };

            const response = await fetch(
                "https://api.paymongo.com/v1/links",
                options
            );

            const res = await response.json();

            return {
                id: res?.data?.id,
                url: res?.data?.attributes?.checkout_url,
            };
        } catch (e) {
            console.log(e);
            return e.message;
        }
    }

    static async checkStatus(id) {
        console.log("TEST", id);
        try {
            const options = {
                method: "GET",
                headers: {
                    accept: "application/json",
                    authorization:
                        "Basic c2tfdGVzdF9vYkRIVHByUDJrTldRY3VkQlpudWJIWHU6cGtfdGVzdF9ScGpUQTdhc05KTFZ3aUt5RzhxVG9YYWQ=",
                },
            };

            const response = await fetch(
                `https://api.paymongo.com/v1/links/${id}`,
                options
            );
            const res = await response.json();

            return res?.data?.attributes?.status;
        } catch (e) {
            console.log(e);
            return e.message;
        }
    }
}
