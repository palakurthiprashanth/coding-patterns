/**
Problem Statement #
Given a string with lowercase letters only, if you are allowed to replace no more than ‘k’ letters with any letter, find the length of the longest substring having the same letters after replacement.

Example 1:

Input: String="aabccbb", k=2
Output: 5
Explanation: Replace the two 'c' with 'b' to have a longest repeating substring "bbbbb".
Example 2:

Input: String="abbcb", k=1
Output: 4
Explanation: Replace the 'c' with 'b' to have a longest repeating substring "bbbb".
Example 3:

Input: String="abccde", k=1
Output: 3
Explanation: Replace the 'b' or 'd' with 'c' to have the longest repeating substring "ccc".


https://www.youtube.com/watch?v=qxDH4nxtt1w

**/

function length_of_longest_substring(str, k) {
  let start = 0;
  let frequencyMap = {};
  let maxLength = 0;
  let maxFrequency = 0;
  for (var end = 0; end < str.length; end++) {
    var right = str[end];
    if (!(right in frequencyMap)) {
      frequencyMap[right] = 0;
    }
    frequencyMap[right] += 1;
    maxFrequency = Math.max(maxFrequency, frequencyMap[right]);
    if (end - start + 1 - maxFrequency > k) {
      var left = str[start];
      frequencyMap[left] -= 1;
      start = start + 1;
    }
    maxLength = Math.max(maxLength, end - start + 1);
  }
  return maxLength;
}
console.log(length_of_longest_substring("aabccbb", 2));
console.log(length_of_longest_substring("abbcb", 1));
console.log(length_of_longest_substring("abccde", 1));

/**
Time Complexity #
The time complexity of the above algorithm will be O(N)O(N) where ‘N’ is the number of letters in the input string.

Space Complexity #
As we are expecting only the lower case letters in the input string, we can conclude that the space complexity will be O(26)O(26), to store each letter’s frequency in the HashMap, which is asymptotically equal to O(1)O(1).
**/
