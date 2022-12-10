import React, { useState } from 'react'
import { Card, Table, Select, Input, Button, Badge, Menu, Modal, Form, message } from 'antd';
import ProductListData from "assets/data/product-list.data.json"
import { EditOutlined, DeleteOutlined, SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex'
import utils from 'utils'
import { useEffect } from 'react';
import { createUnitMeasure, getUnitMeasure, updateUnitMeasure, deleteUnitMeasure } from 'utils/api/unitOfMeasure';
import { getUniqueOuqantityCode } from 'utils/api/uniqueQuantityCode';
import { createUnitType, getUnitType } from 'utils/api/typeOfUnit';



const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const { Option } = Select

const District = () => {
    const [list, setList] = useState(ProductListData)
    const [selectedRows, setSelectedRows] = useState([])
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [hsnList, setHsnList] = useState([])
    const [uniqurQuntityList, setUniqurQuntityList] = useState([])
    const [unitTypeList, setUnitypeList] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false)
    const [selectedId, setSelectedId] = useState("")
    const [submitLoading, setSubmitLoading] = useState(false)
    const [initialLoadin, setInitalLoading] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState({
        open: false,
        id: '',
        name: ''
    })
    const showModal = () => {
        setIsModalOpen(true);
    };
    const showEditModal = (row) => {
        setIsModalOpen(true);
        setIsEdit(true);
        setSelectedId(row.id);
        form.setFieldsValue({
            type_of_unit_id: row.Type_Id,
            symbol: row.Symbol,
            formal_name: row.Formal_Name,
            No_of_decimal_places: row.Number_of_Decimal_Places,
            u_q_c_id: row.Unique_Quantity_Code_id
        })
        // handleCountryChange(row.Country_id, true)
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };

    function handleEnter(event) {
        const form = event?.target?.form;
        
        const index = Array.prototype.indexOf.call(form, event.target);
        if (event.keyCode === 13) {
            if ((index + 1) < form.elements.length) {
                form.elements[index + 1]?.focus();
            }
            event.preventDefault();
        } else if (event.keyCode === 27) {
            if ((index - 1) > 0) {
                form.elements[index - 1]?.focus();
            }
            event.preventDefault();
        }
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        setIsEdit(false);
        setSelectedId("")
        form.resetFields();
        setSubmitLoading(false)
        // setStateList([])
    };


    const [form] = Form.useForm()
    const onFinish = async (values) => {
        try {
            const { type_of_unit_id, symbol, formal_name, No_of_decimal_places, u_q_c_id } = values
            setSubmitLoading(true)
            let response;
            if (isEdit && selectedId) {
                response = await updateUnitMeasure(selectedId, type_of_unit_id, symbol, formal_name, No_of_decimal_places, u_q_c_id)
            } else {
                response = await createUnitMeasure(type_of_unit_id, symbol, formal_name, No_of_decimal_places, u_q_c_id);
            }
            if (response?.success === true) {
                message.success(response.message)
            }
            else if (response?.success === false) {
                Object.keys(response.data).map(item => {
                    message.warning(response.data[item][0])
                })
                setSubmitLoading(false);
                return;
            }

            setSubmitLoading(false)
            init()
            setIsModalOpen(false);
            setIsEdit(false);
            setSelectedId("")
            form.resetFields();
        } catch (error) {
            message.error(message)
        }
    };

    const onFinishFailed = errorInfo => {
    };

    async function init() {
        try {
            const response = await getUnitMeasure();
            if (response.data?.length) {
                setHsnList(response.data)
                setIsModalOpen(false);
                // message.success(response.message)
            } else {
                setHsnList([])
            }
        } catch (error) {
            message.error(message)
        }

    }
    async function getCountryData() {
        const response = await getUniqueOuqantityCode();
        if (response.data?.length) {
            setUniqurQuntityList(response.data)
            setIsModalOpen(false);
        } else {
            setHsnList([])
        }

    }
    async function getStatData() {
        setInitalLoading(true)
        const response = await getUnitType();
        if (response.data?.length) {
            setUnitypeList(response.data)
            // setStateList(response.data)
            setIsModalOpen(false);
        } else {
            setHsnList([])
        }
        setInitalLoading(false)
    }

    useEffect(() => {

        init()
        getCountryData()
        getStatData()

    }, [])

    const dropdownMenu = row => (

        <Menu>
            <Menu.Item onClick={() => showEditModal(row)}>
                <Flex alignItems="center">
                    <EditOutlined />
                    <span className="ml-2">Edit</span>
                </Flex>
            </Menu.Item>
            <Menu.Item onClick={() => setOpenDeleteModal({ open: true, id: row.id, name: row.name })}>
                <Flex alignItems="center">
                    <DeleteOutlined />
                    <span className="ml-2">{selectedRows.length > 0 ? `Delete (${selectedRows.length})` : 'Delete'}</span>
                </Flex>
            </Menu.Item>
        </Menu>
    );

    const deleteRow = async (id) => {
        if (!id) return;
        setSubmitLoading(true)
        const response = await deleteUnitMeasure(id)
        setSubmitLoading(false)
        if (response.success === true) {
            message.success(response.message)
            init()
        }
        setOpenDeleteModal({
            open: false,
            id: '',
            name: ''
        })
    }

    const tableColumns = [
        {
            title: 'ID',
            dataIndex: 'id'
        },
        {
            title: 'Symbol',
            dataIndex: 'symbol',
            render: (_, record) => (
                <div className="d-flex">
                    {/* <AvatarStatus size={60} type="square" src={record.image} name={record.name}  /> */}
                    {/* <AvatarStatus size={60} type="square"name={record.name}  /> */}
                    {record.Symbol}
                </div>
            ),
            sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
        },
        {
            title: 'Formal Name',
            dataIndex: 'name',
            render: (_, record) => (
                <div className="d-flex">
                    {/* <AvatarStatus size={60} type="square" src={record.image} name={record.name}  /> */}
                    {/* <AvatarStatus size={60} type="square"name={record.name}  /> */}
                    {record.Formal_Name}
                </div>
            ),
            sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
        },
        {
            title: 'Unique Quantity Code',
            dataIndex: 'uqc',
            render: (_, record) => (
                <div className="d-flex">
                    {/* <AvatarStatus size={60} type="square" src={record.image} name={record.name}  /> */}
                    {/* <AvatarStatus size={60} type="square"name={record.name}  /> */}
                    {record.Unique_Quantity_Code}
                </div>
            ),
            sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
        },
        {
            title: 'No of Decimal Places',
            dataIndex: 'uqc',
            render: (_, record) => (
                <div className="d-flex">
                    {/* <AvatarStatus size={60} type="square" src={record.image} name={record.name}  /> */}
                    {/* <AvatarStatus size={60} type="square"name={record.name}  /> */}
                    {record.Number_of_Decimal_Places}
                </div>
            ),
            sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
        },
        {
            title: 'Unit Type',
            dataIndex: 'type',
            render: (_, record) => (
                <div className="d-flex">
                    {/* <AvatarStatus size={60} type="square" src={record.image} name={record.name}  /> */}
                    {/* <AvatarStatus size={60} type="square"name={record.name}  /> */}
                    {record.Type}
                </div>
            ),
            sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
        },


        {
            title: 'Created Date',
            dataIndex: 'name',
            render: (_, record) => (
                <div className="d-flex">
                    {/* <AvatarStatus size={60} type="square" src={record.image} name={record.name}  /> */}
                    {/* <AvatarStatus size={60} type="square"name={record.name}  /> */}
                    {record.created_at}
                </div>
            ),
            sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
        },
        {
            title: 'Updated Date',
            dataIndex: 'name',
            render: (_, record) => (
                <div className="d-flex">
                    {/* <AvatarStatus size={60} type="square" src={record.image} name={record.name}  /> */}
                    {/* <AvatarStatus size={60} type="square"name={record.name}  /> */}
                    {record.updated_at}
                </div>
            ),
            sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
        },

        {
            title: 'Action',
            dataIndex: 'actions',
            render: (_, elm) => (
                <div className="text-right">
                    <EllipsisDropdown menu={dropdownMenu(elm)} />
                </div>
            )
        }
    ];


    const rowSelection = {
        onChange: (key, rows) => {
            setSelectedRows(rows)
            setSelectedRowKeys(key)
        }
    };

    const onSearch = e => {
        const value = e.currentTarget.value
        const searchArray = e.currentTarget.value ? list : ProductListData
        const data = utils.wildCardSearch(searchArray, value)
        setList(data)
        setSelectedRowKeys([])
    }

    const handleShowCategory = value => {
        if (value !== 'All') {
            const key = 'category'
            const data = utils.filterArray(ProductListData, key, value)
            setList(data)
        } else {
            setList(ProductListData)
        }
    }

    // const handleCountryChange =(val, isEdit) =>{
    // 	setStateList(unitTypeListOgn.filter(ele=>ele.Country_id == val))
    //    if(!isEdit){
    //     form.setFieldValue('state_id', '')
    //    }
    // }


    return (
        <>
            <Card>
                <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
                    <Flex className="mb-1" mobileFlex={false}>
                        <div className="mr-md-3 mb-3">
                            <Input placeholder="Search" prefix={<SearchOutlined />} onChange={e => onSearch(e)} />
                        </div>
                        {/* <div className="mb-3">
							<Select
								defaultValue="All"
								className="w-100"
								style={{ minWidth: 180 }}
								onChange={handleShowCategory}
								placeholder="Category"
							>
								<Option value="All">All</Option>
								{
									categories.map(elm => (
										<Option key={elm} value={elm}>{elm}</Option>
									))
								}
							</Select>
						</div> */}
                    </Flex>
                    <div>
                        <Button onClick={showModal} type="primary" icon={<PlusCircleOutlined />} block>Add Unit measure</Button>
                    </div>
                </Flex>
                <div className="table-responsive">
                    <Table
                        columns={tableColumns}
                        dataSource={hsnList}
                        rowKey='id'
                        rowSelection={{
                            selectedRowKeys: selectedRowKeys,
                            type: 'checkbox',
                            preserveSelectedRowKeys: false,
                            ...rowSelection,
                        }}
                        loading={initialLoadin}
                    />
                </div>
            </Card>
            <Modal
                title={isEdit ? "Edit Unit Measure" : "Add Measure"} open={isModalOpen} onCancel={handleCancel} footer={[
                    // <Button type="primary" htmlType="submit"  onClick={onFinish}>
                    // 	Submit
                    // </Button>,
                    // <Button type="primary" onClick={handleCancel}	>
                    // 			Cancel
                    // 		</Button>
                ]}>
                <Form
                    form={form}
                    style={{ width: '85%' }}
                    // style={{boxShadow: '2px 5px 15px -10px rgb(0,0,0,0.5)',  padding:'10px', width:'50%'}}
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >

                    <Form.Item
                        onKeyDown={handleEnter}
                        label="symbol"
                        name="symbol"
                        rules={[{ required: true, message: 'Symbol  field is required!' }]}
                    >
                        <Input placeholder="symbol" />
                    </Form.Item>


                    <Form.Item

                        onKeyDown={handleEnter}
                        label="Formal Name"
                        name="formal_name"
                        rules={[{ required: true, message: ' Formal name field  is required' }]}
                    >

                        <Input placeholder="Formal Name" />
                    </Form.Item>
                    <Form.Item

                        onKeyDown={handleEnter}
                        label="No of decimal "
                        name="No_of_decimal_places"
                        rules={[{ required: true, message: ' No of decimal places field  is required' }]}
                    >

                        <Input placeholder="No of decimal"/>
                    </Form.Item>

                    <Form.Item onKeyDown={handleEnter} name="u_q_c_id" label="Unique quantity " rules={[{ required: true, message: ' Unique quantity Code  Select is required' }]} >
                        <Select className="w-100" placeholder="Select Unique quantity Code " >
                            {
                                uniqurQuntityList.length > 0 ?
                                    uniqurQuntityList.map((elm) => {
                                        return <Option key={elm.id} value={elm.id}>{elm.name}</Option>
                                    })
                                    :
                                    "No Data"
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item onKeyDown={handleEnter} name="type_of_unit_id" label="Select Unit type" rules={[{ required: true, message: 'Unit type  select is required' }]} >
                        <Select className="w-100" placeholder="Select Unit type ">
                            {
                                unitTypeList.length > 0 ?
                                    unitTypeList.map((elm) => {
                                        return <Option key={elm.id} value={elm.id}>{elm.name}</Option>
                                    })
                                    :
                                    "No Data"
                            }
                        </Select>
                    </Form.Item>


                    <Form.Item {...tailLayout}  >

                        <div style={{
                            width: '82%',
                            marginLeft: "50px"
                        }}>
                            <Button type="primary" htmlType="submit" loading={submitLoading}>
                                {isEdit ? "Save" : "Submit"}
                            </Button>
                            <Button type="primary" onClick={handleCancel} style={{ marginLeft: '20px' }}	>
                                Cancel
                            </Button>
                        </div>

                    </Form.Item>



                </Form>
            </Modal>
            {/* Delete confirmation popup */}
            <Modal
                title={"Delete Unit Type"}
                open={openDeleteModal.open}
                onCancel={() => setOpenDeleteModal({
                    open: false,
                    id: '',
                    name: ''
                })}
                footer={[
                    <Button
                        type="primary"
                        loading={submitLoading}
                        htmlType="submit"
                        onClick={() => deleteRow(openDeleteModal.id)}
                    >
                        Delete
                    </Button>,
                    <Button type="primary" onClick={() => setOpenDeleteModal({
                        open: false,
                        id: '',
                        name: ''
                    })}
                    >
                        Cancel
                    </Button>
                ]}
            >
                <div>
                    <h2>{`Are you sure you want to delete ${openDeleteModal.name} District?`}</h2>
                </div>
            </Modal>
        </>
    )




}

export default District
