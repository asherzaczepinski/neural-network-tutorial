def dot_product(a, b):
    result = 0
    for i in range(len(a)):
        result = result + a[i] * b[i]
    return result

# Test it
inputs = [0.7, 0.8]
weights = [-0.3, 0.9]
print("Dot product:", dot_product(inputs, weights))
