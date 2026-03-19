// api/verify.js
export default async function handler(req, res) {
    const { email } = req.query;
    const accessKey = "qne0ZuRyIS8TWYlfWsr9pfsk2oN6EjEy";
    const secretKey = "m80chFLSXoKfMEWCxmfaDHDo";

    try {
        // vmoscloud প্রক্সি এপিআই এর মাধ্যমে মাইক্রোসফট চেক করা
        // নোট: এখানে আপনার প্রক্সি প্রোভাইডারের স্পেসিফিক এন্ডপয়েন্ট ইউআরএল লাগবে
        const response = await fetch(`https://api.vmoscloud.com/v1/verify?email=${email}`, {
            method: 'GET',
            headers: {
                'X-Access-Key': accessKey,
                'X-Secret-Key': secretKey,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        
        // মাইক্রোসফটের রেসপন্স রিটার্ন করা
        res.status(200).json({ 
            available: data.exists === false, // যদি একাউন্ট না থাকে তবে ট্রু
            status: "Success"
        });
    } catch (error) {
        res.status(500).json({ error: "Proxy Connection Failed" });
    }
}

