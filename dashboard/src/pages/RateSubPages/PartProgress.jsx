import React, { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./PartProgress.scss"; // Ensure your styles are in this file
import Header from "../../layouts/Header";
import SecondBar from "../../layouts/SecondBar";
import ThirdbarRate from "../../layouts/ThirdbarRate";

// List of product names (10 products)
const products = [
  "Product 01",
  "Product 02",
  "Product 03",
  "Product 04",
  "Product 05",
  "Product 06",
  "Product 07",
  "Product 08",
  "Product 09",
  "Product 10",
];

// Function to generate random progress values between 0 and 100
const generateRandomProgressData = () => {
  const data = [];
  for (let i = 0; i < 120; i++) {
    const productIndex = Math.floor(i / 12); // Determine product based on index
    const partNumber = (i % 12) + 1; // Part numbers are from 1 to 12
    const progress = Math.floor(Math.random() * 101); // Random progress between 0 and 100
    const mold = `Mold ${Math.floor(Math.random() * 20) + 1}`; // Random mold
    const productionTime = `${Math.floor(Math.random() * 8) + 1} hours`; // Random production time
    data.push({
      product: products[productIndex],
      part: partNumber,
      progress,
      mold,
      productionTime,
    });
  }
  return data;
};

const PartProgress = () => {
  // Store random progress values
  const progressData = generateRandomProgressData();

  // State for managing expanded block
  const [expandedItem, setExpandedItem] = useState(null);

  // Function to handle block click
  const handleBlockClick = (item) => {
    setExpandedItem(item);
  };

  // Function to close the modal
  const handleClose = () => {
    setExpandedItem(null);
  };

  return (
    <>
      <Header />
      <SecondBar />
      <ThirdbarRate />
      <div className="progress-page">
        {progressData.map((item, index) => (
          <div
            key={index}
            className="progress-block"
            onClick={() => handleBlockClick(item)}
          >
            <p>
              {item.product} - Part {item.part}
            </p>
            <div style={{ width: "60px", height: "60px", marginLeft: "10%" }}>
              <CircularProgressbar
                value={item.progress}
                text={`${item.progress}%`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Modal for expanded details */}
      {expandedItem && (
        <div className="modal-overlay" onClick={handleClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={handleClose}>
              &times; {/* Close button */}
            </button>
            <h2>
              {expandedItem.product} - Part {expandedItem.part}
            </h2>
            <p>Mold: {expandedItem.mold}</p>
            <p>Production Time: {expandedItem.productionTime}</p>
            <p>Current Progress: {expandedItem.progress}%</p>
          </div>
        </div>
      )}
    </>
  );
};

export default PartProgress;HackerRank Home
HackerRank
|
Prepare
Certify
Compete
Apply
Search
2
 
All Contests  MoraXtreme 9.0  Election Troubles
Election Troubles
Problem
Submissions
Leaderboard
During the Sri Lankan elections, citizens from various hometowns are trying to travel to a central polling station to cast their votes. The government has provided buses to transport these voters, but each bus has a maximum capacity and can only be used once due to unseen forces destroying the bus after one journey.

You have to determine the maximum number of people that can be transported from a starting town to the central polling station, if possible. For example, from Thabuththegama to the Anuradhapura polling station.

You will be given the number of towns n, and the number of busses m along with the starting hometown. The central polling station they are travelling to will be the nth town.

Input Format

The first line contains four integers, n (the number of checkpoints), m (the number of bus routes), s (the starting hometown, with 1 ≤ s ≤ n) and p (the number of people trying to vote).

The next m lines each contain three integers u, v, and c, describing a bus route from checkpoint u to checkpoint v with a capacity c. The capacity c represents the maximum number of people the bus can carry before it is decommissioned.

Constraints

1 < n <= 100
1 < m <= 500
1 < c <= 1000
1 < p <= 1000
Output Format

Print a single integer: the maximum number of voters that can be transported.

Sample Input 0

4 4 1 3
1 2 2
2 4 3
1 3 4
3 4 2
Sample Output 0

3
Contest ends in 10 hours
Submissions: 88
Max Score: 80
Rate This Challenge:

    
More
 
#include <stdio.h>
#include <string.h>
#include <limits.h>
#include <queue>

#define MAX 105

int capacity[MAX][MAX], residual[MAX][MAX];
int parent[MAX];
int n, m, s, p;

int bfs(int source, int sink) {
    memset(parent, -1, sizeof(parent));
    std::queue<int> q;
    q.push(source);
    parent[source] = source;

    while (!q.empty()) {
        int u = q.front();
        q.pop();

        for (int v = 1; v <= n; v++) {
            if (parent[v] == -1 && residual[u][v] > 0) {
                parent[v] = u;
                if (v == sink)
                    return 1;
                q.push(v);
            }
        }
    }
    return 0;
}

int edmondsKarp(int source, int sink) {
    int maxFlow = 0;

    memcpy(residual, capacity, sizeof(capacity));

    while (bfs(source, sink)) {
        int pathFlow = INT_MAX;
        for (int v = sink; v != source; v = parent[v]) {
            int u = parent[v];
            pathFlow = pathFlow < residual[u][v] ? pathFlow : residual[u][v];
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

    int maxPeopleTransported = edmondsKarp(s, n);

    printf("%d\n", maxPeopleTransported < p ? maxPeopleTransported : p);

    return 0;
}


1
#include <stdio.h>
2
#include <string.h>
3
#include <limits.h>
4
​
5
#define MAX 105
6
​
7
int capacity[MAX][MAX], residual[MAX][MAX];
8
int parent[MAX];
9
int n, m, s, p;
10
​
11
// Queue implementation for BFS
12
int queue[MAX];
13
int front, rear;
14
​
15
void enqueue(int x) {
16
    queue[rear++] = x;
17
}
18
​
19
int dequeue() {
20
    return queue[front++];
21
}
22
​
23
int isEmpty() {
24
    return front == rear;
25
}
26
​
27
// BFS to find if there is a path from source to sink
28
int bfs(int source, int sink) {
29
    memset(parent, -1, sizeof(parent));
30
    front = rear = 0;
31
    enqueue(source);
32
    parent[source] = source;
33
​
34
    while (!isEmpty()) {
35
        int u = dequeue();
36
​
37
        for (int v = 1; v <= n; v++) {
38
            if (parent[v] == -1 && residual[u][v] > 0) {
39
                parent[v] = u;
40
                if (v == sink)
41
                    return 1;
42
                enqueue(v);
43
            }
44
        }
45
    }
46
    return 0;
47
}
48
​
49
int edmondsKarp(int source, int sink) {
50
    int maxFlow = 0;
51
​
52
    memcpy(residual, capacity, sizeof(capacity));
53
​
54
    while (bfs(source, sink)) {
55
        int pathFlow = INT_MAX;
56
        for (int v = sink; v != source; v = parent[v]) {
57
            int u = parent[v];
58
            if (residual[u][v] < pathFlow)
59
                pathFlow = residual[u][v];
60
        }
61
​
62
        for (int v = sink; v != source; v = parent[v]) {
63
            int u = parent[v];
64
            residual[u][v] -= pathFlow;
65
            residual[v][u] += pathFlow;
66
        }
67
​
68
        maxFlow += pathFlow;
69
    }
70
​
71
    return maxFlow;
72
}
73
​
74
int main() {
75
    scanf("%d %d %d %d", &n, &m, &s, &p);
76
​
77
    memset(capacity, 0, sizeof(capacity));
78
​
79
    for (int i = 0; i < m; i++) {
80
        int u, v, c;
81
        scanf("%d %d %d", &u, &v, &c);
82
        capacity[u][v] += c;
83
    }
84
​
85
    int maxPeopleTransported = edmondsKarp(s, n);
86
​
87
    printf("%d\n", maxPeopleTransported < p ? maxPeopleTransported : p);
88
​
89
    return 0;
90
}
91
​
Line: 91 Col: 1
Run Code Submit CodeUpload Code as File 
Test against custom input
Testcase 0
Congratulations, you passed the sample test case.

Click the Submit Code button to run your code against all the test cases.

Input (stdin)

4 4 1 3
1 2 2
2 4 3
1 3 4
3 4 2
Your Output (stdout)

3
Expected Output

3
Interview Prep | Blog | Scoring | Environment | FAQ | About Us | Support | Careers | Terms Of Service | Privacy Policy |


