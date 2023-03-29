export interface AdGeneratorData {
    item: string;
    attributes: string;
    price: string;
    budget: number;
    phone: string;
}

interface AdGeneratorResponse {
    response: string;
}

export default async function generateAd(
    data: AdGeneratorData,
    costPerWord = 1
) {
    const { item, attributes, price, budget, phone } = data;

    // TODO: move api keys to a secure vault
    const chatbotId = "42bc72b1-8b52-48d9-8891-7b95cc948823";
    const userId = "7c1191b9-aa9b-4117-8f0a-99048767b864";

    const wordCount = budget / costPerWord;
    const prompt = `write a ${wordCount} word appealing classified advert, about trading ${item} for the price of $${price}. Highlight following attributes about ${item}:\n${attributes}. For more inquires call ${phone}`;

    const response = await fetch("/api/conversation", {
        headers: {
            accept: "*/*",
            "accept-language": "en-US,en;q=0.9",
            "cache-control": "no-cache",
            "content-type": "application/json",
            pragma: "no-cache",
            "sec-ch-ua":
                '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Linux"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
        },
        referrer: "https://ora.sh/rainy-black-tvt5/chatgpt",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: JSON.stringify({
            chatbotId,
            input: prompt,
            userId,
        }),
        method: "POST",
        mode: "cors",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const json = (await response.json()) as AdGeneratorResponse;

    const formattedAdText = json.response.replace('"', "");

    return formattedAdText;
}
