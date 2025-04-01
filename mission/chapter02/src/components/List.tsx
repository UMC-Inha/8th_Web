interface ListProps {
  tech: string;
}

const List = ({ tech }: ListProps) => {
  return <li style={{ listStyle: "none" }}>{tech}</li>;
};

export default List;

// 다른 방법
// const List = ({ tech }: { tech: string }) => {
//   console.log(tech);
//   return <li style={{ listStyle: "none" }}>{tech}</li>;
// };

// export default List;
