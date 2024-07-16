#include <stdio.h>
#include <stdbool.h>

bool isPrime(int num) {
    if (num <= 1) return false;
    for (int i = 2; i * i <= num; i++) {
        if (num % i == 0) return false;
    }
    return true;
}

int main() {
    int lower, upper;
    printf("Enter the lower and upper limit to list primes: ");
    scanf("%d %d", &lower, &upper);

    printf("All prime numbers between %d to %d are: ", lower, upper);
    for (int i = lower; i <= upper; i++) {
        if (isPrime(i)) {
            printf("%d, ", i);
        }
    }
    printf("\n");

    return 0;
}
