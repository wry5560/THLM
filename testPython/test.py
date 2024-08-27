def is_valid_number(number):
    # 检查是否为数字且小于 10e50
    return number.isdigit() and len(number) < 51

def process_numbers(numbers):
    results = []
    
    # Question 1: How many digits are in the number?
    num_digits = len(numbers[0])
    results.append(num_digits)
    
    # Question 2: What is the sum of all of the digits in the number?
    sum_digits = sum(int(digit) for digit in numbers[1])
    results.append(sum_digits)
    
    # Question 3: What is the sum of the digits at the odd locations?
    sum_odd_location_digits = sum(int(numbers[2][i]) for i in range(0, len(numbers[2]), 2))
    results.append(sum_odd_location_digits)
    
    return results

# Read input with validation
numbers = []
for _ in range(3):
    while True:
        number = input("请输入一个小于 10e50 的自然数: ").strip()
        if is_valid_number(number):
            numbers.append(number)
            break

        else:
            print("输入无效，请重新输入。")

# Process the numbers and get the results
results = process_numbers(numbers)

# Print the results
for result in results:
    print(result)