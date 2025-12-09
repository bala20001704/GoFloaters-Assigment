const Sidebar = () => {
  return (
    <nav className="p-4">
      <ul className="space-y-3 text-gray-700">
        <li className="hover:text-black cursor-pointer">Home</li>
        <li className="hover:text-black cursor-pointer">Products</li>
        <li className="hover:text-black cursor-pointer">Categories</li>
        <li className="hover:text-black cursor-pointer">Profile</li>
      </ul>
    </nav>
  );
};

export default Sidebar;
