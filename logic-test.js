function groupAnagrams(words) {
  const result = []
  
  // arrange string to have sorted alphabets
  // example: kua -> aku
  function arrangeString(str) {
    // bubble sort
    const chars = str.split('')
    for (let i = 0; i < chars.length; i++) {
      for (let j = 0; j < chars.length - i - 1; j++) {
        if (chars[j] > chars[j + 1]) {
          const temp = chars[j]
          chars[j] = chars[j + 1]
          chars[j + 1] = temp
        }
      }
    }
    return chars.join('')
  }
  
  // groups is group of anagrams
  const groups = {} 
  
  for (let i = 0; i < words.length; i++) {
    const word = words[i]
    const key = arrangeString(word)
    
    if (!groups[key]) {
      groups[key] = []
    }

    groups[key].push(word)
  }
  
  // convert object to two dimension array
  for (let key in groups) {
    result.push(groups[key])
  }
  
  return result
}

const input = ['kita', 'atik', 'tika', 'aku', 'kia', 'makan', 'kua']
console.log(groupAnagrams(input))
