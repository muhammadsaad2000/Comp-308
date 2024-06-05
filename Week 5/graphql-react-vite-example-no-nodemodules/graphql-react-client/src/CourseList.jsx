import React from 'react';
import {gql, useQuery} from "@apollo/client";

// note the backquotes here
const GET_COURSES = gql`
{
    courses{
      title
      author
    }
}
`;
//
const CourseList = () => {

    const { loading, error, data , refetch } = useQuery(GET_COURSES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div>
            <ul>
                {data.courses.map(item => <li>{item.title}</li>)}
            </ul>
            <button onClick={() => refetch()}>Refetch</button>
        </div>
    );
}

export default CourseList
