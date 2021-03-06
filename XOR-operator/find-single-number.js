/**
In a non-empty array of integers, every number appears twice except for one, find that single number.

Example 1:

Input: 1, 4, 2, 1, 3, 2, 3
Output: 4
Example 2:

Input: 7, 9, 7
Output: 9

**/

function find_single_number(arr) {
  let num = 0;
  for (var i = 0; i < arr.length; i++) {
    num = num ^ arr[i];
  }
  return num;
}
console.log(find_single_number([1, 4, 2, 1, 3, 2, 3]));

/**
Time Complexity: Time complexity of this solution is O(n)O(n) as we iterate through all numbers of the input once.

Space Complexity: The algorithm runs in constant space O(1).
**/
