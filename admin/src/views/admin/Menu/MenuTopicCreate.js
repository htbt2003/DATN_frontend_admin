import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MenuServices from '../../../services/MenuServices';
import TopicServices from '../../../services/TopicServices';

function MenuTopicCreate(prop) {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [topics, settopics] = useState([]);
  const navigator = useNavigate();
  useEffect(function () {
    (async function () {
      const result = await TopicServices.getAll();
      settopics(result.topicsAll);
    })();
  }, []);

  const handleCheckboxChange = (topicId) => {
    const isSelected = selectedTopics.includes(topicId);
    if (isSelected) {
      setSelectedTopics(prevSelected => prevSelected.filter(id => id !== topicId));
    } else {
      setSelectedTopics(prevSelected => [...prevSelected, topicId]);
    }
  };

  function MenuTopicStore(event) {
    event.preventDefault();//không load lại trang
    const stringid = selectedTopics.join('');
    const position=prop.position
    const listid=stringid
    const type= "chu-de-bai-viet"
    MenuServices.tao(position, type, listid)
    .then((result) => {
      alert(result.message);
      navigator('/admin/menu', { replace: true });
    })
  }

  return (
    <form method='post' onSubmit={MenuTopicStore}>
      <li className="list-group-item mb-2 border nav-item">
        <a
          className="nav-link menu-expanded"
          href="#multiCollapseTopic"
          data-toggle="collapse"
        //aria-expanded="false"
        >
          Chủ đề bài viết
        </a>
        <div
          className="multi-collapse border-top mt-2 collapse"
          id="multiCollapseTopic"
        >
          {topics && topics.length > 0 && topics.map(function (topic, index) {
            return (
              <div className="form-check" key={index}>
                <input
                  name="topicid[]"
                  className="form-check-input"
                  type="checkbox"
                  defaultValue=""
                  id={"topic" + topic.id}
                  style={{ width: 17, margin: " -13px 16px" }}
                  onChange={() => handleCheckboxChange(topic.id)}
                  checked={selectedTopics.includes(topic.id)}

                />
                <label className="form-check-label" htmlFor={"topic" + topic.id}>
                  {topic.name}
                </label>
              </div>
            );
          })}

          <div className="my-3">
            <button
              name="ADDtopic"
              type="submit"
              className="btn btn-sm btn-success form-control"
            >
              Thêm menu chủ đề bài viết
            </button>
          </div>
        </div>
      </li>
    </form>
  );
}

export default MenuTopicCreate;