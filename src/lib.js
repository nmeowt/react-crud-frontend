function buildUrl(url, parameters) {
    let qs = "";
    for (const key in parameters) {
        if (parameters.hasOwnProperty(key)) {
            const value = parameters[key];
            qs +=
                encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
        }
    }
    if (qs.length > 0) {
        qs = qs.substring(0, qs.length - 1);
        url = url + "?" + qs;
    }

    return url;
}

export class callAPI {
    constructor(url, method, body) {
        this.url = url;
        this.method = method;
        this.body = body;
    }

    async GET(query) {
        return fetch(buildUrl(this.url, query), {
            mode: 'cors',
            method: 'GET',
            type: 'json',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        }).then(res => res.json())
    }

    async POST(body) {
        return fetch(this.url, {
            mode: 'cors',
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(body)
        }).then(res => res.json());
    }

    async call() {
        switch (this.method) {
            case "GET":
                return this.GET(this.body);
            case "POST":
                return this.POST(this.body);
            default:
                return new Error('Wrong method');
        }
    }
}