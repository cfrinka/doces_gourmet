const defaultURL = 'https://product-project-backend.herokuapp.com/products';

const listProducts = async (id) => {
    const URL = id ? `${defaultURL}?id=${id}` : defaultURL;

    const products = await axios.get(URL);
    return products;
}

const deleteProducts = async (id) => {
    const URL = `${defaultURL}/${id}`;

    return axios.delete(URL);
}

const createProduct = async ({
    productName: name,
    productPrice: price,
    productDescription: description,
    productCover: cover,
}) => {
    return axios.post(defaultURL, {
        name,
        price,
        description,
        cover
    });
}

const updateProduct = async ({
    productName: name,
    productPrice: price,
    productDescription: description,
    productCover: cover,
    id
}) => {
    const URL = `${defaultURL}/${id}`;

    return axios.put(URL, {
        name,
        price,
        description,
        cover
    });
}