# static-web-ab-testing
This is one possible way how you can create A/B testing with gatsby or any other static site generator (the idea at least). 

How to do AB-testing with a static web site (Gatsby in this case)

# Pre-requisites && Installation
Install the dependencies

```shell
yarn
```

## Run development mode
```shell
yarn start
```
go to http://localhost:8000 to se the site

## Production mode
```shell
yarn build
yarn serve
```
go to http://localhost:9000 to se the site

# The different pages
We have two different pages to showcase how the A/B tests can be written

## ClientABTest
This page shows how a A/B test would look like if we only should use javascript when react have loaded and the effects of that.

```javascript
const ClientABTest = () => {
  const variant = getVariant('abTestId');
  const testContent = <div>Test items</div>

  return (
    <div>
      {variant === 1 ? testContent : null }
      <div>
        ...
      </div>
    </div>
  )
}
```

## ProductPage
This page use injected javascript and css high up in the body to render the A/B test and also select which version the user should see. For example,

```html
<html>
  <head></head>
  <body>
    <style type="no css">
      .test {
        background-color: green;
      }
    </style>
    <script>
      // Calculate which varient the user should see and save it to localstorage
      // Here we also remove the type from the style tag to make the style 
      // active script
    </script>
    <div>
      <div class="test">
        ...
      </div>
    </div>
  </body>
</html>
```
