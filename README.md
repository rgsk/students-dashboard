## Run Locally

Install the dependencies by running `yarn`

For, running the development server locally:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Access deployed website

[https://students-dashboard-three.vercel.app](https://students-dashboard-three.vercel.app)

## Login Credentials

enter below credentials on login page

```
{
  email: 'pw@gmail.com',
  password: '123',
}
```

## Filters on Students Table

Following filters are available on students table

```
id: exact
firstName: includes case-insensitive
lastName: includes case-insensitive
phone: prefix or startsWith
email: includes
rollNumber: exact
age: min-max
gender: dropdown or enum
```
