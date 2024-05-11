import { useState } from "react";
import { Button, Container, Flex, FormControl, FormLabel, Heading, Input, Select, Table, Tbody, Td, Th, Thead, Tr, useToast } from "@chakra-ui/react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

interface Category {
  id: number;
  name: string;
  bottomThreshold: number;
  topThreshold: number;
  portionSize: number;
  company: string;
  salesPrice: number;
}

const companies = ["Adam Mattkasse", "Godlevert", "Linas"];

const generateRandomThreshold = () => Math.floor(Math.random() * 1000 + 100);
const generateRandomSalesPrice = () => parseFloat((Math.random() * 100 + 10).toFixed(2));

const initialCategories: Category[] = Array.from({ length: 11 }, (_, index) => ({
  id: index,
  name: `Category ${index - 3}`,
  bottomThreshold: generateRandomThreshold(),
  topThreshold: generateRandomThreshold(),
  portionSize: Math.floor(Math.random() * 6 + 1),
  company: companies[Math.floor(Math.random() * companies.length)],
  salesPrice: generateRandomSalesPrice(),
}));

const Index = () => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const toast = useToast();

  const handleDelete = (id: number) => {
    setCategories(categories.filter((category) => category.id !== id));
    toast({
      title: "Category deleted",
      description: `You have deleted the category.`,
      status: "error",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleEdit = (category: Category) => {
    setEditingCategory({ ...category });
  };

  const handleSave = () => {
    if (editingCategory) {
      const updatedCategories = categories.map((category) => (category.id === editingCategory.id ? editingCategory : category));
      setCategories(updatedCategories);
      setEditingCategory(null);
      toast({
        title: "Category updated",
        description: `You have updated the category.`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: keyof Category) => {
    if (editingCategory) {
      setEditingCategory({ ...editingCategory, [field]: e.target.value });
    }
  };

  const handleAddNew = () => {
    const newCategory: Category = {
      id: categories.length,
      name: `Category ${categories.length - 3}`,
      bottomThreshold: generateRandomThreshold(),
      topThreshold: generateRandomThreshold(),
      portionSize: Math.floor(Math.random() * 6 + 1),
      company: companies[Math.floor(Math.random() * companies.length)],
      salesPrice: generateRandomSalesPrice(),
    };
    setCategories([...categories, newCategory]);
    toast({
      title: "Category added",
      description: `You have added a new category.`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.xl">
      <Heading mb={4}>Category Management</Heading>
      <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={handleAddNew}>
        Add New Category
      </Button>
      <Table variant="simple" mt={4}>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Bottom Threshold</Th>
            <Th>Top Threshold</Th>
            <Th>Portion Size</Th>
            <Th>Company</Th>
            <Th>Sales Price</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {categories.map((category) => (
            <Tr key={category.id}>
              <Td>{category.name}</Td>
              <Td>{category.bottomThreshold}</Td>
              <Td>{category.topThreshold}</Td>
              <Td>{category.portionSize}</Td>
              <Td>{category.company}</Td>
              <Td>${category.salesPrice}</Td>
              <Td>
                <Button size="sm" mr={2} leftIcon={<FaEdit />} onClick={() => handleEdit(category)}>
                  Edit
                </Button>
                <Button size="sm" colorScheme="red" leftIcon={<FaTrash />} onClick={() => handleDelete(category.id)}>
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {editingCategory && (
        <Flex mt={4} p={4} border="1px" borderColor="gray.200" direction="column">
          <FormControl isRequired mb={3}>
            <FormLabel>Bottom Threshold</FormLabel>
            <Input value={editingCategory.bottomThreshold} onChange={(e) => handleChange(e, "bottomThreshold")} />
          </FormControl>
          <FormControl isRequired mb={3}>
            <FormLabel>Top Threshold</FormLabel>
            <Input value={editingCategory.topThreshold} onChange={(e) => handleChange(e, "topThreshold")} />
          </FormControl>
          <FormControl isRequired mb={3}>
            <FormLabel>Portion Size</FormLabel>
            <Select value={editingCategory.portionSize} onChange={(e) => handleChange(e, "portionSize")}>
              {Array.from({ length: 6 }, (_, i) => (
                <option key={i} value={i + 1}>
                  Size {i + 1}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl isRequired mb={3}>
            <FormLabel>Company</FormLabel>
            <Select value={editingCategory.company} onChange={(e) => handleChange(e, "company")}>
              {companies.map((company) => (
                <option key={company} value={company}>
                  {company}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl isRequired mb={3}>
            <FormLabel>Sales Price</FormLabel>
            <Input type="number" value={editingCategory.salesPrice} onChange={(e) => handleChange(e, "salesPrice")} />
          </FormControl>
          <Button colorScheme="blue" onClick={handleSave}>
            Save Changes
          </Button>
        </Flex>
      )}
    </Container>
  );
};

export default Index;
