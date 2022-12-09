import React, { useState } from 'react'
import { Card, Table, Select, Input, Button, Badge, Menu, Modal, Form, message } from 'antd';
import ProductListData from "assets/data/product-list.data.json"
import { EditOutlined, DeleteOutlined, SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex'
import utils from 'utils'

// import { Form, Input, Checkbox } from 'antd';
import { useEffect } from 'react';
import { getDistrict, createDistrict, deleteDistrict, updateDistrict } from 'utils/api/district';
import { getCountry } from 'utils/api/country';
import { getState } from 'utils/api/state';

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
    const [countryList, setCountryList] = useState([])
    const [stateListOgn, setStateListOgn] = useState([])
    const [stateList, setStateList] = useState([])
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
            name: row.name,
            short_code: row.short_code,
            state_code: row.state_code,
            country_id: row.Country_id,
            state_id: row.State_id
        })
        handleCountryChange(row.Country_id, true)
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setIsEdit(false);
        setSelectedId("")
        form.resetFields();
        setSubmitLoading(false)
        setStateList([])
    };

    function handleEnter(event) {
        const form = event?.target?.form;
        console.log(event?.key, form?.elements, 'key===')
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

    const [form] = Form.useForm()
    const onFinish = async (values) => {
        try {
            const { name, short_code, state_id, country_id } = values
            setSubmitLoading(true)
            let response;
            if (isEdit && selectedId) {
                response = await updateDistrict(selectedId, name, short_code, state_id, country_id)
            } else {
                response = await createDistrict(name, short_code, state_id, country_id);
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
            const response = await getDistrict();
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
        const response = await getCountry();
        if (response.data?.length) {
            setCountryList(response.data)
            setIsModalOpen(false);
        } else {
            setHsnList([])
        }

    }
    async function getStatData() {
        setInitalLoading(true)
        const response = await getState();
        if (response.data?.length) {
            setStateListOgn(response.data)
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

    // delete gst***********
    const deleteRow = async (id) => {
        if (!id) return;
        setSubmitLoading(true)
        const response = await deleteDistrict(id)
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
            title: 'District Name',
            dataIndex: 'District_name',
            render: (_, record) => (
                <div className="d-flex">
                    {/* <AvatarStatus size={60} type="square" src={record.image} name={record.name}  /> */}
                    {/* <AvatarStatus size={60} type="square"name={record.name}  /> */}
                    {record.name}
                </div>
            ),
            sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
        },
        {
            title: 'Sort Code',
            dataIndex: 'short_code',
            render: (_, record) => (
                <div className="d-flex">
                    {/* <AvatarStatus size={60} type="square" src={record.image} name={record.name}  /> */}
                    {/* <AvatarStatus size={60} type="square"name={record.name}  /> */}
                    {record.short_code}
                </div>
            ),
            sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
        },

        {
            title: 'Country Name',
            dataIndex: 'counter_name',
            render: (_, record) => (
                <div className="d-flex">
                    {/* <AvatarStatus size={60} type="square" src={record.image} name={record.name}  /> */}
                    {/* <AvatarStatus size={60} type="square"name={record.name}  /> */}
                    {record.Country_name}
                </div>
            ),
            sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
        },
        {
            title: 'State Name',
            dataIndex: 'State_Name',
            render: (_, record) => (
                <div className="d-flex">
                    {/* <AvatarStatus size={60} type="square" src={record.image} name={record.name}  /> */}
                    {/* <AvatarStatus size={60} type="square"name={record.name}  /> */}
                    {record.State_Name}
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

        // {
        // 	title: 'Category',
        // 	dataIndex: 'category',
        // 	sorter: (a, b) => utils.antdTableSorter(a, b, 'category')
        // },
        // {
        // 	title: 'Price',
        // 	dataIndex: 'price',
        // 	render: price => (
        // 		<div>
        // 			<NumberFormat
        // 				displayType={'text'}
        // 				value={(Math.round(price * 100) / 100).toFixed(2)}
        // 				prefix={'$'}
        // 				thousandSeparator={true}
        // 			/>
        // 		</div>
        // 	),
        // 	sorter: (a, b) => utils.antdTableSorter(a, b, 'price')
        // },
        // {
        // 	title: 'Stock',
        // 	dataIndex: 'stock',
        // 	sorter: (a, b) => utils.antdTableSorter(a, b, 'stock')
        // },
        // {
        // 	title: 'Status',
        // 	dataIndex: 'stock',
        // 	render: stock => (
        // 		<Flex alignItems="center">{getStockStatus(stock)}</Flex>
        // 	),
        // 	sorter: (a, b) => utils.antdTableSorter(a, b, 'stock')
        // },
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

    const handleCountryChange = (val, isEdit) => {
        setStateList(stateListOgn.filter(ele => ele.Country_id == val))
        if (!isEdit) {
            form.setFieldValue('state_id', '')
        }
    }


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
                        <Button onClick={showModal} type="primary" icon={<PlusCircleOutlined />} block>Add District</Button>
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
                title={isEdit ? "Edit District" : "Add District"} open={isModalOpen} onCancel={handleCancel} footer={[
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
                        label="District Name"
                        name="name"
                        rules={[{ required: true, message: 'District Name field is required!' }]}
                    >
                        <Input />
                    </Form.Item>


                    <Form.Item
                        onKeyDown={handleEnter}

                        label="Sort Code"
                        name="short_code"
                        rules={[{ required: true, message: 'Short code field  is required' }]}
                    >

                        <Input />
                    </Form.Item>

                    <Form.Item onKeyDown={handleEnter} name="country_id" label="Country" rules={[{ required: true, message: 'Country  field is required' }]} >
                        <Select className="w-100" placeholder="Select Country" onChange={(val) => handleCountryChange(val, false)}>
                            {
                                countryList.length > 0 ?
                                    countryList.map((elm) => {
                                        return <Option key={elm.id} value={elm.id}>{elm.name}</Option>
                                    })
                                    :
                                    "No Data"
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item onKeyDown={handleEnter} name="state_id" label="State" rules={[{ required: true, message: 'State  select is required' }]} >
                        <Select className="w-100" placeholder="Select State">
                            {
                                stateList.length > 0 ?
                                    stateList.map((elm) => {
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
                title={"Delete District"}
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
