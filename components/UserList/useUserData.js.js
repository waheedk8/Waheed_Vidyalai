// useUserData.js
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useUserData = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [sortColumn, setSortColumn] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get('/api/v1/users');
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    let filtered = users.filter(
      user =>
        user.name.toLowerCase().includes(searchName.toLowerCase()) &&
        user.email.toLowerCase().includes(searchEmail.toLowerCase())
    );

    if (sortColumn) {
      filtered.sort((a, b) => {
        const x = a[sortColumn];
        const y = b[sortColumn];
        if (x < y) return sortDirection === 'asc' ? -1 : 1;
        if (x > y) return sortDirection === 'asc' ? 1 : 'desc';
        return 0;
      });
    }

    setFilteredUsers(filtered);
  }, [searchName, searchEmail, users, sortColumn, sortDirection]);

  const handleOnSearch = useCallback((event) => {
    const { name, value } = event.target;
    if (name === 'name') {
      setSearchName(value);
    } else if (name === 'email') {
      setSearchEmail(value);
    }
  }, []);

  const handleSort = useCallback((column) => {
    setSortColumn((prevColumn) => {
      if (prevColumn === column) {
        setSortDirection((prevDirection) => (prevDirection === 'asc' ? 'desc' : 'asc'));
        return prevColumn;
      } else {
        setSortDirection('asc');
        return column;
      }
    });
  }, []);

  return {
    users: filteredUsers,
    searchName,
    searchEmail,
    sortColumn,
    sortDirection,
    handleOnSearch,
    handleSort
  };
};

export default useUserData;
