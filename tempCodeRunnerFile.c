#include <stdio.h>
#include <string.h>
#include <limits.h>

#define MAX 105

int capacity[MAX][MAX], residual[MAX][MAX];
int parent[MAX];
int n, m, s, p;


int line[MAX];
int front, rear;

void addToLine(int x) {
    line[rear++] = x;
}

int removeFromLine() {
    return line[front++];
}

int isEmpty() {
    return front == rear;
}


int search(int source, int sink) {
    memset(parent, -1, sizeof(parent));
    front = rear = 0;
    addToLine(source);
    parent[source] = source;

    while (!isEmpty()) {
        int u = removeFromLine();

        for (int v = 1; v <= n; v++) {
            if (parent[v] == -1 && residual[u][v] > 0) {
                parent[v] = u;
                if (v == sink)
                    return 1;
                addToLine(v);
            }
        }
    }
    return 0;
}

int maxFlow(int source, int sink) {
    int maxFlow = 0;

    memcpy(residual, capacity, sizeof(capacity));

    while  (search(source, sink)) {
        int pathFlow = INT_MAX;
        for (int v = sink; v != source; v = parent[v]) {
            int u = parent[v];
            if (residual[u][v] < pathFlow)
                pathFlow = residual[u][v];
        }

        for (int v = sink; v != source; v = parent[v]) {
            int u = parent[v];
            residual[u][v] -= pathFlow;
            residual[v][u] += pathFlow;
        }

        maxFlow += pathFlow;
    }

    return maxFlow;
}

int main() {
    scanf("%d %d %d %d", &n, &m, &s, &p);

    memset(capacity, 0, sizeof(capacity));

    for (int i = 0; i < m; i++) {
        int u, v, c;
        scanf("%d %d %d", &u, &v, &c);
        capacity[u][v] += c;
    }

    int maxPeopleTransported = maxFlow(s, n);

    printf("%d\n", maxPeopleTransported < p ? maxPeopleTransported : p);

    return 0;
}
