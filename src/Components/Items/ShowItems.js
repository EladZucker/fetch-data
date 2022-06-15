import { useEffect, useRef, useState } from "react";
import {
  createItem,
  DeleteItem,
  GetItems,
  renameItem,
} from "../../Services/Api";
import { useOutletContext } from "react-router-dom";

const ShowItems = (props) => {
  const [userData] = useOutletContext();
  const [items, setItems] = useState([]);
  const [editableItem, setEditableItem] = useState(undefined);

  const newItemElement = useRef("");

  const updateItems = async () => {
    const newItems = await GetItems(userData.accessToken);
    setItems(newItems);
  };

  const onCreateItem = async () => {
    if (newItemElement.current.value === "") {
      return;
    }

    try {
      const response = await createItem(
        userData.accessToken,
        newItemElement.current.value
      );

      updateItems();

      newItemElement.current.value = "";
    } catch (err) {}
  };

  const onDeleteItem = async (event, id) => {

    event.stopPropagation();
    try {
      await DeleteItem(userData.accessToken, id);
      const newItems = items.filter((item) => !(item.id === id));
      setItems(newItems);
    } catch (error) {
      console.log(error);
    }
  };

  const onEditItem = (event, item) => {
    setEditableItem(item);
  };

  const onSaveRenamedItem = async (event) => {
    try {
      const newItem = await renameItem(
        userData.accessToken,
        editableItem.id,
        editableItem.name
      );

      const newItems = items.map((item) =>
        item.id === newItem.id ? newItem : item
      );
      setItems(newItems);
      setEditableItem(undefined);
    } catch (error) {}
  };

  const onKeyPress = (event) => {
    if (event.key === "Enter") {
        onSaveRenamedItem(event);
    }
  }
  useEffect(() => {
    updateItems();
  }, [userData]);

  return (
    <>
      <ul>
        {items.map((item) =>
          editableItem?.id === item.id ? (
            <>
              <input
                value={editableItem.name}
                onChange={(event) =>
                  setEditableItem({ ...editableItem, name: event.target.value })
                }
                onBlur={onSaveRenamedItem}
                onKeyPress={onKeyPress}
              ></input>
              <button onClick={onSaveRenamedItem}>Save</button>
            </>
          ) : (
            <li key={item.id} onClick={(event) => setEditableItem(item)}>
              {item.name}
              <button onClick={(event) => onDeleteItem(event, item.id)}>
                X
              </button>
            </li>
          )
        )}
      </ul>
      <input ref={newItemElement} type="text"></input>
      <button onClick={onCreateItem}>Create</button>
    </>
  );
};

export default ShowItems;
