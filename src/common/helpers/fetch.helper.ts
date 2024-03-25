// This function is an asynchronous function that fetches data from a specific URL.
// The function is generic and can return data of any type <T>.
export const useFetch = async <T>(
  // 'type' is a string that specifies the type of data to fetch.
  type: string,
  // 'params' is an object that contains the parameters to be sent with the request.
  params: Record<string, string | number>
): Promise<T> => {
  // Create a new URL object with the specified URL.
  const url = new URL("https://www.jiosaavn.com/api.php");

  // Append the necessary parameters to the URL's search params.
  url.searchParams.append("__call", type); // Add the API call type
  url.searchParams.append("_format", "json"); // Specify JSON format for response
  url.searchParams.append("_marker", "0"); // Marker for pagination
  url.searchParams.append("ctx", "web6dot0"); // Context
  url.searchParams.append("api_version", "4"); // API version

  // For each key-value pair in the 'params' object, append the key and value to the URL's search params.
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, String(params[key]))
  );

  // Fetch the data from the URL.
  const response = await fetch(url.toString());

  // Parse the response data as JSON.
  const data = await response.json();

  // Return the parsed data.
  return data as T;
};
