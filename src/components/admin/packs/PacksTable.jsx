import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import styles from "../adminCSS/AdminCSS.module.css";
import AdminNav from "../adminNav/AdminNav";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as iconListSolid from "@fortawesome/free-solid-svg-icons";

function PacksTable() {
  const user = useSelector((state) => state.user);
  const [packs, setPacks] = useState(null);

  useEffect(() => {
    const getPacks = async () => {
      const response = await axios({
        url: `${process.env.REACT_APP_API_URL}/packs`,
        method: "GET",
        headers: {
          Authorization: "Bearer " + user.token,
        },
      });
      setPacks(response.data);
    };
    getPacks();
  }, []); // eslint-disable-line

  return (
    <div className={`${styles.body} row`}>
      <div className="col-4 col-md-2">
        <AdminNav active={"Packs"} />
      </div>
      <div className="col-8 col-md-10">
        {packs && (
          <table className={`${styles.scrollX} table`}>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Pack Image</th>
                <th scope="col">Product 1</th>
                <th scope="col">Product 2</th>
                <th scope="col">Product 3</th>
                <th scope="col">Product 4</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {packs.map((pack, index) => {
                return (
                  <tr key={pack._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{pack.name}</td>
                    <td>{pack.bigImage}</td>
                    <td>{pack.stock}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <button className={styles.buttonPencil}>
                        <FontAwesomeIcon icon={iconListSolid.faEdit} />
                      </button>
                      <button className={styles.buttonDelete}>
                        <FontAwesomeIcon icon={iconListSolid.faTrash} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default PacksTable;
