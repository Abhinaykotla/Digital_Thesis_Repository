import React from 'react';

const SearchResults = ({ results }) => {
  if (!results || results.length === 0) {
    return <p>No results found.</p>;
  }

  return (
    <div className="">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Keywords</th>
            <th>Author</th>
            <th>year</th>
            <th>View Theses</th>
          </tr>
        </thead>
        {results.map((result) => (
          <tr key={result.thesis_id}>
            {/* <a href={'peerreview/'+result.thesis_id}> */}
            <td><h3>{result.title}</h3></td>
            <td><b>{result.keywords}</b></td>
            <td><b>{result.author}</b></td>
            <td><b>{result.year}</b></td>
            {/* </a> */}
            <td><a href={'/peerreview/' + result.thesis_id} className='btn btn-primary btn-sm '>View Thesis</a></td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default SearchResults;
