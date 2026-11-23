## Reflection

1. What is the difference between building a UI imperatively (plain DOM code) and declaratively (React)?

Imperative UI means manually telling the browser how to change the page. Declarative UI means describing what the page should look like, and React updates it when the data changes.

2. Why must a component name start with a capital letter?

A component name starts with a capital letter so React can recognise it as a custom component instead of a normal HTML element.

3. What does a fragment <>...</> do, and why not just use a <div>?

A fragment allows us to group multiple elements without adding an extra HTML element to the page. This keeps the HTML structure cleaner.

4. Name one benefit of splitting the UI into small components.

Small components make the code easier to read, maintain, and reuse in different parts of the application.

## Week 6

1. Order Placement Process

When the user clicks Place Order, the system first checks whether the checkout information is valid. Then, it calls the handlePlaceOrder() function in CartPage.jsx. This function sends the cart details to placeOrders() in orders.js to save the orders in Firestore. After the order is saved successfully, the user will be redirected to the My Orders page. The orders are displayed using useMyOrders() and subscribeToMyOrders(), which listen for changes in Firestore. This is why I do not need to manually update the orders using setOrders().

2. Firestore Database Structure

The orders collection is stored separately from the vendors collection in Firestore. This makes it easier to manage and find student orders. Each order also stores the vendor name, item name and price instead of only storing their IDs. This is because I want the order details to remain the same even if the vendor changes the menu later. For example, if the price of Shawarma changes from RM6.50 to RM7.00, the previous order will still show the original price. It also makes it easier to display the order details on the My Orders page.

3. Personal Feature: Order Notes per Item

My personal feature for this lab is Order Notes per Item. This feature allows students to add special notes to their food items, such as less spicy or no onions. The notes are saved inside the items array in each document under the orders collection. The field used to store the notes is called note. In my orders.js file, I used this line to save the notes:

note: note || ''

In OrdersPage.jsx, I used the following code to display the notes:

{item.note && \ — Note: ${item.note}`}`

This allows students to see their special instructions when viewing their orders.

4.3 Bugs Encountered and Fixes

During this lab, I encountered an error when running my application because of an issue with the OrderStatus component import. I checked the error using the terminal and found that the component was missing its default export. I fixed it by adding export default OrderStatus to the file. I also encountered an error when placing an order because some old cart items did not have a vendorId. I fixed this by removing the old items and adding them again from the updated vendor menus.