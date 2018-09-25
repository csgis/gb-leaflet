/**
 * link urls in strings
 * arguments (str) text
 * returns string
 */
const urlify = text => {
	if (text.toLowerCase().includes("iframe")) 
		return text // do nothing in iframe context
	let urlRegex = /(https?:\/\/[^\s]+)(<\/td>)/g;
  	return text.replace(urlRegex, '<a href="$1" target="blank">$1</a>');
	}

export {urlify};

