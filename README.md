# Free Code Camp Back End Projects - Image Search Abstraction Layer

## User stories:

1. I can get the image URLs, alt text and page urls for a set of images relating to a given search string.
2. I can paginate through the responses by adding a ?offset=2 parameter to the URL.
3. I can get a list of the most recently submitted search strings.

### Example usage:

* http://localhost:5000/api/imagesearch/lolcats%20funny?offset=10
* http://localhost:5000/api/latest/imagesearch/

## Live preview

Coming Soon

## Info

Image Search Abstraction Layer API project for [Free Code Camp] Back End Certification.

### Configuration

* Register on Google Custom search engine
* Create a new **API key**
* Create a new Custom search engine and get the **ID (cx)**
* Set the API key in **CSE_API_KEY** and ID in **GOOGLE_CX** environment variables
* Start the server with npm start (after installing all dependencies with npm install)

Example:

```
CSE_API_KEY=<YOUR_API_KEY> GOOGLE_CX=<YOUR_CSE_ID> npm start
```

Additional settings (as env variables):

* PORT: the service port
* MAX_HISTORY: number of queries to keep in history (0 = no limit)
* RESULTS: number of results to return

### License

**MIT**

   [Free Code Camp]: <http://www.freecodecamp.com>
