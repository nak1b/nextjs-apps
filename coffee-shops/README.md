## NextJS Coffee Stores App
Application to statically generate cofee stores in Toronto and also allow fetching coffee stores nearby and allow voting the stores. Store data is saved on Airtable.

### Demo Link
https://coffee-stores.vercel.app/

### Stack
- [NextJS](https://nextjs.org/)
- [Airtable](https://airtable.com/) for CMS
- [Vercel](https://vercel.com/) for Deployment

### Setup Enviromental Variables

Create `.env.local` file on root of the project and add following content into the file.

```
NEXT_PUBLIC_FOURSQUARE_AUTH_TOKEN=XXX
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=XXX
AIRTABLE_API_KEY=XXX
AIRTABLE_BASE_KEY=XXX
```

- Get your foursquare token from `https://foursquare.com/developers/projects/`
- Get unsplash access key from `https://unsplash.com/oauth/applications`
- Get Airtable api key from `https://airtable.com/api`

### Running the project

```
npm run dev
# or
yarn dev
```
