/**
 * link urls in strings
 * arguments (str) text
 * returns string
 */

const urlify = text => {
	// do nothing in iframe context
	if (text.toLowerCase().includes("iframe")) 
		return text;

	let urlRegex = /(https?:\/\/[^\s]+)/g;
	return text.replace(urlRegex, 
		url => { text.replace(urlRegex, '<a href="$1" target="_blank">$1</a>') }
		)
	}

export {urlify};

