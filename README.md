// Define the shopping cart as an empty array
DECLARE cart AS ARRAY

// Function to add a product to the cart
FUNCTION addToCart(product)
    IF product.id EXISTS IN cart THEN
        INCREMENT product.quantity IN cart
    ELSE
        APPEND product TO cart
    ENDIF
END FUNCTION

// Function to remove a product from the cart by id
FUNCTION removeFromCart(productId)
    FOR EACH product IN cart
        IF product.id EQUALS productId THEN
            REMOVE product FROM cart
            BREAK
        ENDIF
    END FOR
END FUNCTION

// Function to calculate total price of the cart
FUNCTION calculateTotalPrice()
    DECLARE total AS NUMBER = 0
    FOR EACH product IN cart
        total = total + (product.price * product.quantity)
    END FOR
    RETURN total
END FUNCTION

// Function to calculate average price of the products in cart
FUNCTION calculateAveragePrice()
    IF cart IS EMPTY THEN
        RETURN 0
    ENDIF
    DECLARE total AS NUMBER = calculateTotalPrice()
    DECLARE count AS NUMBER = 0
    FOR EACH product IN cart
        count = count + product.quantity
    END FOR
    RETURN total / count
END FUNCTION

// Function to filter products above a certain price
FUNCTION filterProducts(minPrice)
    DECLARE filteredCart AS ARRAY
    FOR EACH product IN cart
        IF product.price >= minPrice THEN
            APPEND product TO filteredCart
        ENDIF
    END FOR
    RETURN filteredCart
END FUNCTION

// Function to sort products in the cart based on price
FUNCTION sortCart(order)
    IF order EQUALS "ascending" THEN
        SORT cart BY product.price IN ASCENDING ORDER
    ELSE IF order EQUALS "descending" THEN
        SORT cart BY product.price IN DESCENDING ORDER
    ENDIF
END FUNCTION

// Function to clear the cart
FUNCTION clearCart()
    SET cart = EMPTY ARRAY
    PRINT "Your cart is empty"
END FUNCTION
